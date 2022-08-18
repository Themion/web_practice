import { useCallback, useEffect, useState } from 'react'

function App() {
    const [number, setNumber] = useState(0)

    // 재렌더링 할 때마다 useEffect 호출시키지 않음 
    // 캡처링 때문에 number는 0
    const log = useCallback(
        () => console.log('number: ' + number),
        []
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
            <br />
            <button onClick={log}>log</button>
        </div>
    )
}

export default App
