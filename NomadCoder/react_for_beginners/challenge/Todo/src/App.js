import { useState, useEffect } from "react"

const TODOS = "todos"

function Todo(props) {
    return (
        <li>{props.todo}</li>
    )
}

function App() {
    const local_todos = localStorage.getItem(TODOS)

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState(
        local_todos == null ? [] : JSON.parse(local_todos)
    )
    console.log(todos)

    const onChange = (event) => { setTodo(event.target.value) }
    const onSubmit = (event) => {
        event.preventDefault()

        localStorage.setItem(TODOS, JSON.stringify([...todos, todo]))

        setTodos([...todos, todo])
        setTodo("")
    }

    return (
        <div className="App">
            <h1>My Todos ({todos.length})</h1>
            <ul>{todos.map(todo => <Todo key={todo} todo={todo} />)}</ul>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={todo}
                    placeholder="Writh your todo..."
                    onChange={onChange}
                    required />
                <button>Add todo</button>
            </form>
        </div>
    );
}

export default App;
