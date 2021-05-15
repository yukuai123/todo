import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

interface IProps {
  type: string;
  className?: string;
  style?: Object;
}

// 表情type
export const ICON_TYPE = {
  EDIT: "icon-edit",
  FAIL: "icon-shibai",
  DEL: "icon-shanchu",
  MORE: "icon-gengduo",
  MESSAGE: "icon-xiaoxi",
  TARGET: "icon-jiangpai",
  FINISH_FILL: "icon-wancheng",
  FINISH_EMPTY: "icon-wancheng1",
  FAIL_SMILES: "icon-shibaixiaolian",
};

export default (props: IProps) => {
  const { className, type, style } = props;
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2548961_dky8gngk0sj.js",
  });
  return <IconFont type={type} className={className || ""} style={style} />;
};
