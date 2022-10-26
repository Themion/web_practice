function App() {
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, REACT_APP_REDIRECT_URL } = process.env;
  const path = "/";

  return (
    <div className="App">
      <a href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_url=${REACT_APP_REDIRECT_URL}?path=${path}&scope=user:email`}>Github</a>
    </div>
  );
}

export default App;
