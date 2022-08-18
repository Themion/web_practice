import { useCallback, useEffect, useState } from 'react'

function App() {
    const [number, setNumber] = useState(0)

    const log = () => console.log('number: ' + number)

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
