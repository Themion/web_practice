import { useEffect, useState } from "react";

const App = () => {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    useEffect(() => {
        console.log('useEffect')
    }, [a])

    return <div className="App">
        <button onClick={() => {setA(a + 1)}}>{a}</button>
        <button onClick={() => {setB(b + 1)}}>{b}</button>
    </div>
}

export default App;
