import { TodoListType as todo } from "@/constsValue";

export default {
  addTodo: (data) => {
    return {
      type: todo.ADD_TODO,
      data: {
        item: data,
      },
    };
  },
  editTodo: (data) => {
    const { uid, ...params } = data;
    return {
      type: todo.EDIT_TODO,
      data: {
        uid,
        item: params,
      },
    };
  },
  delTodo: (uid) => {
    return {
      type: todo.DEL_TODO,
      data: {
        uid,
      },
    };
  },
};
