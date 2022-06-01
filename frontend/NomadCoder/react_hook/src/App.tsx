import { useInput } from "./hooks/useInput";

const App = () => {
    const validator = (str: string) => !str.includes('@');

    return <div className="App">
        <input placeholder="name" {...useInput("", validator)} />
    </div>
}

export default App;
