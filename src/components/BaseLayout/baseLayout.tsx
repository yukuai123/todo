import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { tool } from "@/utils";
import { Icon, ICON_TYPE } from "@/components";
import { Layout } from "antd";
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

  const total = calcTotal(store.getState().todoList);
  // 先过滤掉已失效的数据
  const alerdyUse = calcTotal(
    store.getState().todoList,
    (item) => item.status !== 0
  );

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
          <Icon type={ICON_TYPE.MESSAGE} />
          <span>
            已用{alerdyUse}, 总容量{total}
          </span>
        </div>
      </Header>
      <Content className={style.content}>{props.children}</Content>
    </Layout>
  );
};
