import React from "react";
import { Badge } from "antd";
import moment from "moment";
import { EllipsisOutlined } from "@ant-design/icons";
import OpDropdown from "./OpDropdown";
import BaseCard from "../BaseCard";

import style from "./index.module.scss";

export const STATUS_TEXT = { EXPIRED: 0, PROGRESS: 1, DONE: 2 };

export interface IData {
  /**
   * 唯一id
   */
  uid: string;
  /**
   * todo标题
   */
  title: string;
  /**
   * 描述
   */
  descibe: string;
  /**
   * 时间戳
   */
  endTime: number;
  startTime: number;
  /**
   * todo类型
   * 0 每天
   * 1 每周
   */
  frequency: number;
  /**
   * todo状态
   * 0 已过期 1 进行中 2 已完成
   */
  status: number;
}

interface IProps {
  data: IData;
}
const FORMAT = "YYYY-MM-DD";
const FREQUENCY_STATUS = ["error", "warning"];
const FREQUENCY_TEXT = ["每天", "每周"];
export default (props: IProps) => {
  const { data } = props;

  const DropdownTsx = (
    <OpDropdown status={data.status} uid={data.uid}>
      <EllipsisOutlined className={style.op} />
    </OpDropdown>
  );
  return (
    <BaseCard title={data.title} extraOps={DropdownTsx}>
      <>
        <section className={style.content}>{data.descibe}</section>
        <section className={style.time}>
          <div className={style.item}>
            <span className={style.label}>开始时间：</span>
            <span>{moment(data.endTime).format(FORMAT)}</span>
          </div>
          <div className={style.item}>
            <span className={style.label}>结束时间：</span>
            <span>{moment(data.endTime).format(FORMAT)}</span>
          </div>
          <div className={style.item}>
            <Badge
              text={FREQUENCY_TEXT[data.frequency]}
              status={FREQUENCY_STATUS[data.frequency] as any}
            />
          </div>
        </section>
      </>
    </BaseCard>
  );
};
