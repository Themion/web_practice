import { useState } from "react";

const App = () => {
    const [item, setItem] = useState(0)
    const incrementItem = () => { setItem(item + 1) }
    const decrementItem = () => { setItem(item - 1) }
    return <div className="App">
        {item}<br />
        <button onClick={incrementItem}>+</button>
        <button onClick={decrementItem}>-</button>
    </div>
}

export default App;
