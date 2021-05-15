import { MessageType as message } from "@/constsValue";

export default {
  addMessage: (data) => {
    return {
      type: message.ADD_MESSAGE,
      data: {
        item: data,
      },
    };
  },
  readMessage: () => {
    return {
      type: message.READ_MESSAGE,
    };
  },
};
