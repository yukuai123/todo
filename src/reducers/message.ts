import { MessageType } from "@/constsValue";

const { ADD_MESSAGE, READ_MESSAGE } = MessageType;

export default (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.data.item];
    case READ_MESSAGE:
      return [];
    default:
      return state;
  }
};
