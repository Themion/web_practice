import { useInput } from "./hooks/useInput";

const App = () => {
    const maxLength = (str: string) => str.length <= 10;

    const name = useInput("", maxLength)

    return <div className="App">
        <input placeholder="name" {...name} />
    </div>
}

export default App;
