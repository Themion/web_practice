import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface TodoType {
    id: number
    text: string
}

export interface TodoAction {
    type: string
    payload: TodoType
}

export const newTodo = (text: string): TodoType => {
    return { text, id: new Date().getTime() }
}

export const slice = createSlice({
    name: "todoReducer",
    initialState: [] as TodoType[],
    reducers: {
        add: (state: TodoType[], action: TodoAction) => 
            [action.payload, ...state],
        delete: (state: TodoType[], action: TodoAction) => 
            state.filter(item => item.id !== action.payload.id)
    }
})

export const todoStore = configureStore({ reducer: slice.reducer });
