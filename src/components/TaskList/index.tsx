import React from "react";
import { useDispatch } from "react-redux";
import { InfoModalAction } from "@/actions";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard, { IData } from "../TaskCard";
import style from "./index.module.scss";

interface IProps {
  list: IData[];
}
const TaskList = (props: IProps) => {
  const dispatch = useDispatch();
  const openInfoModal = () => {
    dispatch(InfoModalAction.openInfoModal(null));
  };

  const { list } = props;
  return (
    <div className={style.list}>
      {list.map((i) => (
        <TaskCard data={i} key={i.uid} />
      ))}
      <div className={style.add} onClick={openInfoModal}>
        <PlusOutlined className={style.icon} />
      </div>
    </div>
  );
};

export default TaskList;
