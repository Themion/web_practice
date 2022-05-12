import { dispatchAddTodo, dispatchDeleteTodo, todoStore } from "./app/TodoStore";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

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
