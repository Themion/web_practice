import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { TodoType } from "../app/TodoStore"

interface Props {
    state: TodoType[]
}

const Detail = (props: Props) => { 
    const id = parseInt(useParams().id!)
    const todo = props.state.find(todo => todo.id === id)
    const date = new Date()
    date.setTime(id)
    return (
        <div>
            <h2>{todo?.text}</h2>
            <h5>Created at: {date.toDateString()}</h5>
        </div>
    )
}

const mapStateToProps = (state: TodoType[]) => {
    return { state }
}

export default connect(mapStateToProps)(Detail)
