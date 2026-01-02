import { configureStore } from "@reduxjs/toolkit";
import { todoListReducer } from "../reducers/reducers";

export const store = configureStore({
  reducer: {
    todoList: todoListReducer.reducer,
  },
});