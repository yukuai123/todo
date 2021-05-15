import { combineReducers } from "redux";
import todoList from "./todoList";
import infoModal from "./infoModal";

const rootReducer = combineReducers({
  todoList,
  infoModal,
});

export default rootReducer;
