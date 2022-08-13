import { useRef, useState } from "react"

function App() {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)

    console.log(countRef)

    const increaseState = () => setCount(count + 1)
    // 자주 바뀌되 re-render될 필요 없는 값을 저장
    const increaseRef = () => countRef.current += 1
    
    return (
        <div className="App">
            <p>State: {count}</p>
            <p>Ref: {countRef.current}</p>
            <button onClick={increaseState}>State +</button>
            <button onClick={increaseRef}>Ref +</button>
        </div>
    )
}

export default App
