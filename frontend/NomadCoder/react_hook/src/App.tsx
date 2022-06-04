import useBeforeLeave from "./hooks/useBeforeLeave";

const App = () => {
    const begForLife = () => console.log("Don't leave!")
    useBeforeLeave(begForLife)
    return <div className="App">
    </div>
}

export default App;
