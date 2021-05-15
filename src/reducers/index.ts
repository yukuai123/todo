import { combineReducers } from "redux";
import todoList from "./todoList";
import infoModal from "./infoModal";
import message from "./message";

const rootReducer = combineReducers({
  todoList,
  infoModal,
  message,
});

export default rootReducer;
