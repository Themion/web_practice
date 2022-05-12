import { configureStore } from "@reduxjs/toolkit";

export interface TodoType {
    id: number
    text: string
}

interface TodoAction {
    type: string
    todo: TodoType
}

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const newTodo = (text: string): TodoType => {
    return { id: new Date().getTime(), text }
}

export const addTodo = (text: string): TodoAction => {
    return { type: ADD_TODO, todo: newTodo(text) }
}
export const deleteTodo = (todo: TodoType): TodoAction => {
    return { type: DELETE_TODO, todo: todo }
}

const reducer = (state: TodoType[] = [], action: TodoAction) => {
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
