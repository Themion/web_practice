import { Dispatch } from "@reduxjs/toolkit"
import { ChangeEvent, FormEvent, useState } from "react"
import { connect } from "react-redux"
import { addTodo, TodoAction, TodoType } from "../app/TodoStore"
import Todo from "../components/Todo"

interface Props {
    state: TodoType[]
    addTodo: (text: string) => TodoAction
}

const Home = (props: Props) => {
    const [value, setValue] = useState("")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value === "") return
        props.addTodo(value)
        setValue("")
    }

    return (
        <div>
            <h1>To Dos</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Write to do" 
                    value={value}
                    onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {props.state.map((todo: TodoType) =>
                    <Todo key={todo.id} {...todo} />
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state: TodoType[]) => {
    return { state }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return { 
        addTodo: (text: string) => dispatch(addTodo(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
