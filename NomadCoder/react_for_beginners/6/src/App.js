import { useState, useEffect } from "react"

function Counter() {
    const [cnt, setCnt] = useState(0)
    const onClick = () => { setCnt((val) => val + 1) }

    useEffect(
        () => {
            console.log("I run when this component is created.")
            return () => { console.log("I run when this component is destroyed.") }
        },
        []
    )
    useEffect(
        () => { return () => console.log("I run when 'cnt' changes.") },
        [cnt]
    )

    return (
        <div className="Counter">
            <h1>{cnt}</h1>
            <button onClick={onClick}>Click Me</button>
        </div>
    )
}

function App() {
    const [show, setShow] = useState(false)

    return (
        <div className="App">
            <button onClick={() => { setShow(!show) }}>
                {show ? "hide" : "show"}
            </button>
            {show ? <Counter /> : ""}
        </div>
    );
}

export default App;