import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoListAction } from "@/actions";
import { tool } from "@/utils";
import { Modal, Form, Input, DatePicker, notification, Select } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

const { Item } = Form;
const { Option } = Select;
const { editTodo, addTodo } = TodoListAction;

interface IProps {
  uid?: any;
  onClose: (refresh?) => void;
}

const layout = { wrapperCol: { span: 16 }, labelCol: { span: 4 } };
export default (props: IProps) => {
  const [form] = Form.useForm();
  const [datetime, setDatetime] = useState<any>({
    startTime: null,
    endTime: null,
  });
  const todoList = useSelector((state: any) => state.todoList);
  const dispatch = useDispatch();

  const formatSubmitData = (data) => {
    const { startTime, endTime, uid, ...params } = data;
    return {
      ...params,
      uid: uid || tool.genUid(),
      // 默认执行状态设置为进行中
      endTime: endTime.valueOf(),
      startTime: startTime.valueOf(),
    };
  };

  const formatInitData = (data) => {
    const { endTime, startTime, ...params } = data;
    return {
      endTime: moment(endTime),
      startTime: moment(startTime),
      ...params,
    };
  };

  const confirm = async () => {
    const { uid } = props;
    let values = await form.validateFields();
    // 新增时 默认状态status == 1为进行中
    values = formatSubmitData(
      uid ? { uid, ...values } : { ...values, status: 1 }
    );
    const submitAction = uid ? editTodo(values) : addTodo(values);
    dispatch(submitAction);

    notification.success({ message: "操作成功" });
    close();
  };

  const close = () => props.onClose();

  const init = () => {
    const { uid } = props;
    if (uid) {
      const [item] = todoList.filter((item) => item.uid === uid);
      form.setFieldsValue(formatInitData(item));
    }
  };

  const onHndleTimeChange = (key) => {
    return (day) => {
      // eslint-disable-next-line no-param-reassign
      setDatetime({ ...datetime, [key]: day?.valueOf() });
    };
  };

  // 返回函数引用的方式不太行
  // const genDisDate = (type) => {
  //   return (curDate) => {
  //     const { startTime, endTime } = datetime;
  //     if (!startTime || !endTime) return false;
  //     if (type === "start") {
  //       return curDate.isAfter(endTime);
  //     }
  //     return curDate.isBefore(startTime);
  //   };
  // };

  const startDisDate = (curDate) => {
    const { endTime } = datetime;
    if (!endTime) return false;
    return curDate.isAfter(endTime);
  };

  const endDisDate = (curDate) => {
    const { startTime } = datetime;
    if (!startTime) return false;
    return curDate.isBefore(startTime);
  };

  useEffect(() => {
    props.uid && init();
  }, []);

  return (
    <Modal
      width={600}
      okText="确定"
      cancelText="取消"
      visible={true}
      onOk={confirm}
      onCancel={close}
      title={props.uid ? "编辑todo" : "新建todo"}
    >
      <Form form={form} {...layout}>
        <Item
          name="title"
          label="标题"
          rules={[{ required: true, message: "请输入todo标题" }]}
        >
          <Input maxLength={20} placeholder="请输入todo标题" />
        </Item>
        <Item
          name="startTime"
          label="开始时间"
          rules={[{ required: true, message: "请选择开始时间" }]}
        >
          <DatePicker
            locale={locale}
            showToday={false}
            style={{ width: 369 }}
            placeholder="请选择开始时间"
            disabledDate={startDisDate}
            onChange={onHndleTimeChange("startTime")}
          />
        </Item>
        <Item
          name="endTime"
          label="结束时间"
          rules={[{ required: true, message: "请选择结束时间" }]}
        >
          <DatePicker
            locale={locale}
            showToday={false}
            style={{ width: 369 }}
            placeholder="请选择结束时间"
            disabledDate={endDisDate}
            onChange={onHndleTimeChange("endTime")}
          />
        </Item>
        <Item
          name="frequency"
          label="计划类型"
          rules={[{ required: true, message: "请选择计划类型" }]}
        >
          <Select placeholder="请选择计划类型">
            <Option value={0}>每天</Option>
            <Option value={1}>每周</Option>
          </Select>
        </Item>
        <Item
          name="descibe"
          label="描述"
          rules={[{ required: true, message: "请输入todo描述" }]}
        >
          <Input.TextArea
            autoSize
            style={{ minHeight: 150 }}
            placeholder="请输入todo描述"
          />
        </Item>
      </Form>
    </Modal>
  );
};
