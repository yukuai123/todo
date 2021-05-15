import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InfoModalAction } from "@/actions";
import {
  TaskList,
  BaseCard,
  BaseLayout,
  Icon,
  ICON_TYPE,
  InfoModal,
} from "@/components";
import { Empty, Progress } from "antd";
import style from "./App.module.scss";

const TitleItem = ({ title, itemIconType }) => {
  return (
    <div className={style.title}>
      <Icon type={itemIconType} />
      <span className={style.innterTitle}>{title}</span>
    </div>
  );
};

const CardItem = ({ title, type }) => (
  <div className={style.cardItem}>
    <Icon type={type} /> <span className={style.innterTitle}>{title}</span>
  </div>
);

const StatusList = ({ list, title, itemIconType }) => {
  return (
    <BaseCard title={title} className={style.expired}>
      {list.length ? (
        list.map((item) => (
          <CardItem key={item.uid} title={item.title} type={itemIconType} />
        ))
      ) : (
        <Empty description="暂无数据" />
      )}
    </BaseCard>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { todoList, infoModal } = useSelector((state: any) => ({
    todoList: state.todoList,
    infoModal: state.infoModal,
  }));
  const closeInfoModal = () => dispatch(InfoModalAction.closeInfoModal());
  const { finishList, expiredList, progressList } = todoList.reduce(
    (ret, next) => {
      next.status === 0 && ret.expiredList.push(next);
      next.status === 1 && ret.progressList.push(next);
      next.status === 2 && ret.finishList.push(next);
      return ret;
    },
    {
      finishList: [],
      expiredList: [],
      progressList: [],
    }
  );
  return (
    <BaseLayout>
      <main>
        <TaskList list={progressList} />
        <div className={style.bars}>
          <BaseCard title="执行率" className={style.rate}>
            <Progress percent={30} />
          </BaseCard>

          <StatusList
            list={finishList}
            title={<TitleItem title="已完成" itemIconType={ICON_TYPE.TARGET} />}
            itemIconType={ICON_TYPE.FINISH_FILL}
          />

          <StatusList
            list={expiredList}
            title={
              <TitleItem title="已失效" itemIconType={ICON_TYPE.FAIL_SMILES} />
            }
            itemIconType={ICON_TYPE.FAIL}
          />
        </div>

        {infoModal.visible && (
          <InfoModal uid={infoModal.uid} onClose={closeInfoModal} />
        )}
      </main>
    </BaseLayout>
  );
};

export default App;
