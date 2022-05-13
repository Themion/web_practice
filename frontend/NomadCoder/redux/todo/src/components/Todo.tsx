import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteTodo, TodoType } from "../app/TodoStore"

interface Props {
    todo: TodoType,
    deleteTodo: () => void
}

const Todo = (props: Props) => {
    const todo = props.todo

    return (
        <li>
            <Link to={`/${todo.id}`}>{todo.text}</Link>
            <span onClick={props.deleteTodo}>❌</span>
        </li>
    )
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TodoType) => {
    return {
        todo: ownProps,
        deleteTodo: () => dispatch(deleteTodo(ownProps.id))
    }
}

export default connect(null, mapDispatchToProps)(Todo)
