import { useInput } from "./hooks/useInput";

const App = () => {
    const name = useInput("Mr.")

    return <div className="App">
        <input placeholder="name" {...name} />
    </div>
}

export default App;
