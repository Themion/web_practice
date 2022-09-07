import { useEffect, useRef } from "react"

function App() {
    const ref = useRef()

    const onClick = (e) => {
        alert(`Welcome, ${ref.current.value}`)
        ref.current.focus()
    }

    // useRef를 이용해 HTMLElement에 접근
    useEffect(() => {
        ref.current.focus()
    })

    return (
        <div className="App">
            <input ref={ref} type="text" placeholder="username"/>
            <button onClick={onClick}>login</button>
        </div>
    )
}

export default App
