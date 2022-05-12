import { ADD_TODO, DELETE_TODO, Todo, todoStore } from "./app/TodoStore";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

const dispatchAddTodo = (todo: Todo) => {
    todoStore.dispatch({type: ADD_TODO, todo: todo})
}
const dispatchDeleteTodo = (todo: Todo) => {
    todoStore.dispatch({type: DELETE_TODO, todo: todo}) 
}

const onChange = () => {
    ul.innerHTML = ""
    todoStore.getState().forEach(todo => {
        const onClick = () => { dispatchDeleteTodo(todo) }
        const span = document.createElement('span')
        span.onclick = onClick
        span.innerText = '❌'

        const li = document.createElement('li')
        li.id = todo.id.toString();
        li.innerText = todo.text
        li.appendChild(span)

        ul.appendChild(li)
    })
}

const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (input.value !== "") dispatchAddTodo({
        id: new Date().getTime(),
        text: input.value
    })

    input.value = ""
}

todoStore.subscribe(onChange)
form.onsubmit = onSubmit
