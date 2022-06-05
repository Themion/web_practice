import useNetwork from "./hooks/useNetwork";

const App = () => {
    const handleNetworkChange = (onLine: boolean) => {
        console.log(onLine ? "we just went online" : "we are offline")
    }
    const onLine = useNetwork(handleNetworkChange)

    return <div className="App">
        <h1>{onLine ? 'online' : 'offline'}</h1>
    </div>
}

export default App;
