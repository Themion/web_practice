import { configureStore } from "@reduxjs/toolkit";

interface TodoAction {
    type: string
    todo: string
}

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

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

const store = configureStore({ reducer: reducer });

const onChange = () => {
    ul.innerHTML = ""
    store.getState().forEach(todo => {
        ul.innerHTML += `<li>${todo}</li>`
    })
}
store.subscribe(onChange)

form.onsubmit = (event) => { 
    event.preventDefault()
    if (input.value === "") return
    store.dispatch({type:ADD_TODO, todo: input.value}) 
    input.value = ""
}
