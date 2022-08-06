import { useState } from "react"
import Timer from "./components/Timer"

function App() {
    const [timer, setTimer] = useState(false)
    const changeTimer = () => setTimer(!timer)
    
    return (
        <div className="App">
            {timer && <Timer />}
            <button onClick={changeTimer}>Toggle Timer</button>
        </div>
    )
}

export default App
