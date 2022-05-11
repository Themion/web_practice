import { configureStore } from "@reduxjs/toolkit";

interface TodoAction {
    type: string
    todo: string
}

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

const reducer = (state: string[] = [], action: TodoAction) => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case DELETE_TODO:
            return state.filter(item => item !== action.todo);
        default:
            return state;
    }
};

export const todoStore = configureStore({ reducer: reducer });

