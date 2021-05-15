import { TodoListType } from "@/constsValue";

const { ADD_TODO, EDIT_TODO, DEL_TODO } = TodoListType;

export default (state = [], action) => {
  console.log(action);

  switch (action.type) {
    case ADD_TODO:
      return [...state, action.data.item];
    case EDIT_TODO:
      return state.map((item) => {
        if (item.uid === action.data.uid) {
          return { ...item, ...action.data.item };
        }
        return item;
      });
    case DEL_TODO:
      return state.filter((item) => item.uid !== action.data.uid);
    default:
      return state;
  }
};
