import React from "react";
import { useDispatch } from "react-redux";
import { TodoListAction, InfoModalAction } from "@/actions";
import { Menu, Dropdown, Modal, notification } from "antd";
import style from "./OpDropdown.module.scss";

interface IProps {
  uid: string;
  status: number;
  children: React.ReactElement;
}

const confirm = (ok, options?) => {
  const m = Modal.confirm({
    title: "提示",
    content: "确认要完成该任务？",
    okText: "确定",
    cancelText: "取消",
    ...(options || {}),
    onOk: () => {
      ok();
      notification.success({ message: "操作成功" });
      m.destroy();
    },
    onCancel: () => m.destroy(),
  });
};

export default (props: IProps) => {
  const { uid, status } = props;
  const dispatch = useDispatch();

  const onHandleClick = ({ key }) => {
    switch (key) {
      case "finish":
        confirm(() => dispatch(TodoListAction.editTodo({ uid, status: 2 })));
        break;
      case "edit":
        dispatch(InfoModalAction.openInfoModal(uid));
        break;
      case "del":
        confirm(() => dispatch(TodoListAction.delTodo(uid)), {
          content: "确认删除该任务？",
        });
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onHandleClick}>
      <Menu.Item key="finish">
        <a>完成</a>
      </Menu.Item>
      <Menu.Item key="edit">
        <a>编辑</a>
      </Menu.Item>
      <Menu.Item key="del">
        <a>删除</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown arrow overlay={menu} trigger={["click"]} disabled={status === 0}>
      {props.children}
    </Dropdown>
  );
};
