import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "@/model/todoModel";
import { useEffect } from "react";
interface TodoState{
    todos: Todo[],
    todoId: number
}


// ep kieu cho initalState
const initialState: TodoState = {
    todos: [],
    todoId: -1
}

const TodoSlice = createSlice({
    name: 'todos',
    initialState: initialState,

    reducers: {
        // dung PayloadAction de ep kieu payload cua action
        addTodo: (state, action: PayloadAction<Todo>) => {
            
            const todo = action.payload;
            state.todos.push(todo);
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const idTodo = action.payload;
            const findTodo = state.todos.findIndex(todo => todo.id === idTodo);
                    
            if(findTodo !== -1){
                state.todos.splice(findTodo, 1);
            }
        },
        changeTodoStatus: (state, action: PayloadAction<number>) => { 
            const idTodo = action.payload;
            const newTodo = state.todos.map((t) => {
                if(idTodo === t.id){
                    return {...t, status: !t.status}
                }else{
                    return t;
                }})
            
            state.todos = newTodo;
        },
        updateTodo: (state, action: PayloadAction<Todo>) => { 
            const {formEdit, idEdit} = action.payload;
            const newTodo = state.todos.map((t) => {
                if(idEdit === t.id){
                    return formEdit
                }else{
                    return t;
                }})
            
            state.todos = newTodo;
        },
        startEditTodo: (state, action: PayloadAction<number>) => {            
            state.todoId = action.payload;
            
        },
        endEditTodo: (state, action: PayloadAction<number>) => {
            state.todoId = -1;
        }

    }
})

export const {addTodo, changeTodoStatus, removeTodo, updateTodo, startEditTodo, endEditTodo} = TodoSlice.actions;
const todoReducer = TodoSlice.reducer;
export default todoReducer;