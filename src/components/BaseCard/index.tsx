import React from "react";
import style from "./index.module.scss";

interface IProps {
  title: string | React.ReactElement;
  extraOps?: React.ReactElement;
  children?: React.ReactElement;
  className?: string;
}
export default (props: IProps) => {
  return (
    <div className={`${style.task} ${props.className || ""}`}>
      <h1 className={`${style.title} title`}>
        <span>{props.title}</span>
        {props.extraOps}
      </h1>
      <div className={`${style.content} content`}>{props.children}</div>
    </div>
  );
};
