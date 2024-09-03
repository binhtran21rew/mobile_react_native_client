import { createAction, createReducer} from "@reduxjs/toolkit";
import { Todo } from "@/model/todoModel";

export const addTodo = createAction<Todo>('todo/addTodo')
export const removeTodo = createAction<Todo>('todo/remove');
export const changeTodoStatus = createAction<Todo>('todo/changeStatus');
export const getTodo = createAction<Todo>('todo/getId');
export const updateTodo = createAction<Todo>('todo/update');

export const initialState = {
    text: '',
    date: '',
    status: false,
}