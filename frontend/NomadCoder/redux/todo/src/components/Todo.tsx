import { connect } from "react-redux"
import { deleteTodo, TodoType } from "../app/TodoStore"

interface Props {
    todo: TodoType,
    deleteTodo: () => void
}

const Todo = (props: Props) => {
    const todo = props.todo

    return (
        <li id={todo.id.toString()}>
            {todo.text}
            <span onClick={props.deleteTodo}>❌</span>
        </li>
    )
}

const mapDispatchToProps = (dispatch: any, ownProps: TodoType) => {
    return {
        todo: ownProps,
        deleteTodo: () => dispatch(deleteTodo(ownProps))
    }
}

export default connect(null, mapDispatchToProps)(Todo)
