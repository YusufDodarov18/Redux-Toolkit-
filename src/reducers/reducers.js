import { createSlice } from "@reduxjs/toolkit";

export const todoListReducer = createSlice({
  name: "Todo",
  initialState:{
    todo:JSON.parse(localStorage.getItem("Todo"))||[]
  },
  reducers:{
    AddTodo:(state,action)=>{
        state.todo.push({
          id:Date.now(),
          title:action.payload,
          completed:false
        })
    },
    DeleteTodo:(state,action)=>{
        state.todo=state.todo.filter(e=>e.id!==action.payload)
    },
    EditTodo:(state,action)=>{
        const find=state.todo.find(el=>el.id===action.payload.id)
        if(find)find.title=action.payload.title
    },
    CompletedTask:(state,action)=>{
        state.todo=state.todo.map(e=>e.id===action.payload?{...e,completed:!e.completed}:e)
    }
  }
});
export const {AddTodo,DeleteTodo,EditTodo,CompletedTask}=todoListReducer.actions;

