import { useTitle } from "./hooks/useTitle";

const App = () => {
    const setTitle = useTitle("Loading...")
    setTimeout(() => setTitle("Home"), 5000)
    return <div className="App">
        <h1>Hello</h1>
    </div>
}

export default App;
