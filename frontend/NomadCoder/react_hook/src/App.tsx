import useNotification from "./hooks/useNotification";

const App = () => {
    const trigger = useNotification('Testing notification', {
        body: 'this is body'
    })
    return <div className="App">
        <h1>Hello</h1>
        <button onClick={trigger}>useNotification</button>
    </div>
}

export default App;
