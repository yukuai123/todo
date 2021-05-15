import { InfoModalType as modal } from "@/constsValue";

export default {
  openInfoModal: (uid) => {
    return {
      type: modal.OPEN_INFO_MODAL,
      data: {
        uid,
        visible: true,
      },
    };
  },
  closeInfoModal: () => {
    return {
      type: modal.CLOSE_INFO_MODAL,
      data: {
        uid: null,
        visible: false,
      },
    };
  },
};
