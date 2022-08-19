import { useState } from "react"

function App() {
    const [name, setName] = useState('')

    const onChange = (e) => setName(e.target.value)

    return (
        <div className="App">
            <h1>출석부</h1>
            <p>총 학생 수: ?</p>
            <input 
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={onChange} />
            <button>추가</button>
        </div>
    )
}

export default App
