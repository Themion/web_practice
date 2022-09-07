import { useReducer, useState } from "react"
import Student from "./components/Student"

const reducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'add': 
            return [...state, {
                ...payload,
                id: Date.now(),
                isHere: false
            }]
        case 'delete': 
            return state.filter(student => student.id !== payload.id)
        case 'mark':
            return state.map(student => {
                if (student.id === payload.id)
                    student.isHere = !student.isHere
                return student
            })
        default:
            return state
    }
}

function App() {
    const [name, setName] = useState('')
    const [students, dispatch] = useReducer(reducer, [])

    const onChange = (e) => setName(e.target.value)

    return (
        <div className="App">
            <h1>출석부</h1>
            <p>총 학생 수: {students.length}</p>
            <input 
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={onChange} />
            <button onClick={() => dispatch({
                type: 'add',
                payload: { name, dispatch }
            })}>
                추가
            </button>
            <ul>
                {students.map(student => (
                    <li key={student.id}><Student {...student} /></li>
                ))}
            </ul>
        </div>
    )
}

export default App
