import { useCallback, useEffect, useState } from 'react'

function App() {
    const [number, setNumber] = useState(0)
    const [toggle, setToggle] = useState(true)

    // 재렌더링 할 때마다 useEffect 호출시키지 않음
    // number가 바뀔 때만 log 함수 갱신
    const log = useCallback(
        () => console.log('number: ' + number),
        [number]
    )

    useEffect(() => {
        console.log('function log has changed')
    }, [log])

    return (
        <div className="App">
            <input 
                type="number" 
                value={number}
                onChange={(e) => setNumber(e.target.value)}/>
            <button onClick={() => setToggle(!toggle)}>
                {toggle.toString()}
            </button>
            <br />
            <button onClick={log}>log</button>
        </div>
    )
}

export default App
