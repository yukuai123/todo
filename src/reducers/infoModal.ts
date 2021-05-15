import { InfoModalType } from "@/constsValue";

const { OPEN_INFO_MODAL, CLOSE_INFO_MODAL } = InfoModalType;

const initData = { visible: false, uid: null };

export default (state = initData, action) => {
  switch (action.type) {
    case OPEN_INFO_MODAL:
      return { ...state, ...action.data };
    case CLOSE_INFO_MODAL:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
