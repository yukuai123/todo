import React, { useEffect, useState, useMemo } from "react";
import { useStore, useSelector, useDispatch } from "react-redux";
import { tool } from "@/utils";
import { Icon, ICON_TYPE } from "@/components";
import { Layout, Badge, Popover } from "antd";
import { CardItem } from "@/App";
import { MessageAction } from "@/actions";
import style from "./baseLayout.module.scss";

const { Header, Content } = Layout;

interface IProps {
  children: React.ReactElement;
}
/**
 * 计算字符工具函数
 * 计算总字符数
 * @param list 对象数组
 * @param filter 自定义过滤函数
 */
const calcTotal = (list, filter?) => {
  const KB = 1024;
  const M = KB * KB;

  const customFiltre = filter || Boolean;

  let total = list.filter(customFiltre).reduce((ret, next) => {
    const totalVal = tool.calcCharNum(
      Object.values(next).join("").split("") || []
    );
    return ret + totalVal;
  }, 0);

  let unit = "b";
  if (total > KB) {
    total = Math.round(total / KB);
    unit = "KB";
  }
  if (total > M) {
    total = Math.round(total / M);
    unit = "M";
  }
  return `${total}${unit}`;
};

export default (props: IProps) => {
  const store = useStore();
  const { todoList, message } = useSelector((state: any) => ({
    todoList: state.todoList,
    message: state.message,
  }));
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);

  const total = useMemo(() => calcTotal(todoList), [todoList]);
  // 先过滤掉已失效 & 完成的数据
  const alerdyUse = useMemo(
    () => calcTotal(todoList, (item) => [0, 2].includes(item.status)),
    [todoList]
  );

  const renderMsgList = () => {
    const renderList = message.map((i) => {
      return (
        <CardItem
          title={i.title}
          type={ICON_TYPE.FAIL}
          key={i.uid}
          className={style.cardItem}
        />
      );
    });

    return renderList.length ? renderList : null;
  };

  const onHandlePopVisible = (visible) => {
    message.length && setVisible(visible);
    // 关闭popover时关闭已读所有消息
    return !visible && dispatch(MessageAction.readMessage());
  };

  useEffect(() => {
    const listener = () => {
      tool.local.set("store", store.getState());
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <div className={style.logo}>XOA</div>
        <div className={style.info}>
          <Badge
            showZero={false}
            count={store.getState()?.message?.length || 0}
          >
            <Popover
              trigger="click"
              placement="bottom"
              visible={visible}
              content={renderMsgList()}
              overlayClassName={style.pop}
              onVisibleChange={onHandlePopVisible}
              getPopupContainer={(trigger: any) => trigger.parentNode}
            >
              {/* 不加div无法触发pop visible */}
              <div>
                <Icon type={ICON_TYPE.MESSAGE} className={style.message} />
              </div>
            </Popover>
          </Badge>

          <span style={{ marginLeft: 20 }}>
            已用{alerdyUse}, 总容量{total}
          </span>
        </div>
      </Header>
      <Content className={style.content}>{props.children}</Content>
    </Layout>
  );
};
