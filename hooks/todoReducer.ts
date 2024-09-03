import { createAction, createReducer } from "@reduxjs/toolkit";

import { Todo } from "@/model/todoModel";
interface TodoState{
    todos: Todo[]
}

// ep kieu cho initalState
const initalState: TodoState = {
    todos: [],
}


// tao cac action cho tung dispatch 
// ep kieu action can handle du lieu cho cac payload
// tao name cho cac action
export const addTodo = createAction<Todo>('todo/addTodo')
export const removeTodo = createAction<number>('todo/remove');
export const changeTodoStatus = createAction<number>('todo/changeStatus');
export const updateTodo = createAction<Todo>('todo/update');

const todoRuducer = createReducer(initalState, action => {
    action
    .addCase(addTodo, (state, action) => {
        
        const todo = action.payload;
        state.todos.push(todo);
    })
    .addCase(removeTodo, (state, action) => {
        const idTodo = action.payload;
        const findTodo = state.todos.findIndex(todo => todo.id === idTodo);
                
        if(findTodo !== -1){
            state.todos.splice(findTodo, 1);
        }
    })
    .addCase(changeTodoStatus, (state, action) => {
        const idTodo = action.payload;
        const newTodo = state.todos.map((t) => {
            if(idTodo === t.id){
                return {...t, status: !t.status}
            }else{
                return t;
            }})
        
        state.todos = newTodo;
    })
    .addCase(updateTodo, (state, action) => {
        const {formEdit, idEdit} = action.payload;
        const newTodo = state.todos.map((t) => {
            if(idEdit === t.id){
                return formEdit
            }else{
                return t;
            }})
        
        state.todos = newTodo;
        
    })
})

export default todoRuducer;