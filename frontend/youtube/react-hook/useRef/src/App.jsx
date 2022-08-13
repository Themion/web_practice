import { useEffect, useRef, useState } from "react"

function App() {
    const [count, setCount] = useState(1)
    const renderCount = useRef(0)

    const increaseState = () => setCount(count + 1)
    
    useEffect(() => {
        console.log('렌더링 횟수: ' + renderCount.current++)
    })

    return (
        <div className="App">
            <p>State: {count}</p>
            <button onClick={increaseState}>State +</button>
        </div>
    )
}

export default App
