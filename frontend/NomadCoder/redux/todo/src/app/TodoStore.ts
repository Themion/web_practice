import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export interface TodoType {
    id: number
    text: string
}

export interface TodoAction {
    type: string
    payload: TodoType
}

export const addTodo = createAction('ADD', (text: string) => {
    return { payload: { id: new Date().getTime(), text } as TodoType }
})
export const deleteTodo = createAction('DELETE', (id: number) => {
    return { payload: {id, text: ""} as TodoType }
})

const reducer = createReducer([] as TodoType[], {
    [addTodo.type]: (state: TodoType[], action: TodoAction) => 
        [action.payload, ...state],
    [deleteTodo.type]: (state: TodoType[], action: TodoAction) => 
        state.filter(item => item.id !== action.payload.id)
})

export const todoStore = configureStore({ reducer: reducer });
