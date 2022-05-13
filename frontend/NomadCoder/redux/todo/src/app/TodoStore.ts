import { configureStore, createAction } from "@reduxjs/toolkit";

export interface TodoType {
    id: number
    text: string
}

export interface TodoAction {
    type: string
    payload: TodoType
}

export const addTodo = createAction('ADD', (text: string) => {
    return {
        payload: { id: new Date().getTime(), text } as TodoType
    }
})
export const deleteTodo = createAction('DELETE', (id: number) => {
    return { payload: {id, text: ""} as TodoType }
})

const reducer = (state: TodoType[] = [], action: TodoAction) => {
    switch (action.type) {
        case addTodo.type:
            return [ action.payload, ...state ]
        case deleteTodo.type:
            return state.filter(item => item.id !== action.payload.id);
        default:
            return state;
    }
};

export const todoStore = configureStore({ reducer: reducer });
