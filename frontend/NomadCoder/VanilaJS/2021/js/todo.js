const todo_form = document.querySelector("#todo-form")
const todo_input = todo_form.querySelector("input")
const todo_list = document.querySelector("#todo-list")

const TODO = "todo"

let todo_array = []

function setTodoArray (array) {
    localStorage.setItem(TODO, JSON.stringify(array))
    todo_array = array
}

function handleDelete (e) {
    const item = e.path[1]
    setTodoArray(todo_array.filter(todo => todo.id != item.id ))
    item.remove()
}

function paintTodo(todo) {
    const li = document.createElement("li")
    const todo_text = document.createElement("span")
    const todo_del = document.createElement("span")
    
    todo_text.innerText = todo.text

    todo_del.innerText = "❌"
    todo_del.addEventListener("click", handleDelete)
    
    li.id = todo.id
    li.appendChild(todo_text)
    li.appendChild(todo_del)

    todo_list.appendChild(li)
}

function handleTodoSubmit(e) {
    e.preventDefault()

    let todo = {
        text: todo_input.value, 
        id: new Date().getTime()
    }

    setTodoArray(todo_array.concat(todo))

    paintTodo(todo)
    todo_input.value = ""
}

function init() {
    const unparsedTodo = localStorage.getItem(TODO)
    if (unparsedTodo != null) {
        todo_array = JSON.parse(unparsedTodo)
        todo_array.forEach(paintTodo)
    }
    todo_form.addEventListener("submit", handleTodoSubmit)
}

init()
