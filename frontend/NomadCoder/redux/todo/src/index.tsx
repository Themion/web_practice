import { ADD_TODO, todoStore } from "./app/TodoStore";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

const onChange = () => {
    ul.innerHTML = ""
    todoStore.getState().forEach(todo => {
        ul.innerHTML += `<li>${todo}</li>`
    })
}
const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (input.value === "") return
    todoStore.dispatch({type: ADD_TODO, todo: input.value}) 
    input.value = ""
}

todoStore.subscribe(onChange)
form.onsubmit = onSubmit
