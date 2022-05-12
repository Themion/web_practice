import { configureStore } from "@reduxjs/toolkit";

export interface Todo {
    id: number
    text: string
}

interface TodoAction {
    type: string
    todo: Todo
}

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

const reducer = (state: Todo[] = [], action: TodoAction) => {
    switch (action.type) {
        case ADD_TODO:
            return [ action.todo, ...state ]
        case DELETE_TODO:
            return state.filter(item => item.id !== action.todo.id);
        default:
            return state;
    }
};

export const todoStore = configureStore({ reducer: reducer });

export const dispatchAddTodo = (todo: Todo) => {
    todoStore.dispatch({type: ADD_TODO, todo: todo})
}
export const dispatchDeleteTodo = (todo: Todo) => {
    todoStore.dispatch({type: DELETE_TODO, todo: todo}) 
}
