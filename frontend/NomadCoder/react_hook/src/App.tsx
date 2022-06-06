import useAxios from "./hooks/useAxios";

const App = () => {
    const { loading, error, data, refetch } = useAxios({
        url: 'https://yts.mx/api/v2/list_movies.json'
    })

    console.log({ loading, error, data, refetch })

    return <div className="App">
        <h1>{data && data.status}</h1>
        <button onClick={refetch}>refetch</button>
    </div>
}

export default App;
