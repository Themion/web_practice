import { useEffect } from 'react'
import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState("")

    const increaseCount = () => setCount(count + 1)
    const decreaseCount = () => setCount(count - 1)
    const handleInput = (e) => setText(e.target.value)

    useEffect(
        () => console.log('(re-)rendered!')
    )
    useEffect(
        () => console.log('just rendered!'),
        []
    )
    useEffect(
        // 렌더링될 때마다 실행
        () => console.log('count has changed!'), 
        // 재렌더링 시 조건 설정
        [count]
    )
    useEffect(
        () => console.log('text has changed!'), 
        [text]
    )

    return (
        <div className="App">
            <div>
                <button onClick={decreaseCount}>-</button>
                <span>{count}</span>
                <button onClick={increaseCount}>+</button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={text}
                    onChange={handleInput}/>
                <span>{text}</span>
            </div>
        </div>
    )
}

export default App
