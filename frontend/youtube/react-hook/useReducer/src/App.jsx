import { useState } from "react"

function App() {
    const [number, setNumber] = useState(0)

    return (
        <div className="App">
            <h2>은행 예제</h2>
            <p>잔고: ?원</p>
            <input 
                type="number"
                value={number}
                onChange={e => setNumber(e.target.value)}
                step={1000} />
            <button>예금</button>
            <button>출금</button>
        </div>
    )
}

export default App
