import { useRef, useState } from "react"

function App() {
    let count = 0
    const countRef = useRef(0)
    const [renderer, render] = useState(0)
    
    const increaseLet = () => {
        count += 1
        console.log('let: ' + count)
    }
    // 자주 바뀌되 re-render될 필요 없는 값을 저장
    // 일반 변수와 다르게 re-render 되더라도 값이 사라지지 않음
    const increaseRef = () => {
        countRef.current += 1
        console.log('ref: ' + countRef.current)
    }

    const doRender = () => render(renderer + 1)
    
    return (
        <div className="App">
            <p>let: {count}</p>
            <p>Ref: {countRef.current}</p>
            <button onClick={increaseLet}>let +</button>
            <button onClick={increaseRef}>Ref +</button>
            <button onClick={doRender}>render</button>
        </div>
    )
}

export default App
