import './App.css'
import { addTopic, getTopic, findAll } from './axios'

function App() {
  const createTopic = () => {
    const title = prompt('title?') ?? "default title";
    const body = prompt('body?') ?? "default body";

    addTopic(title, body).then(res => console.log(res.data));
  }
  const logTopic = () => {
    const id = parseInt(prompt('id?') ?? '0')
    if (isNaN(id)) console.error(`wrong id: ${id}`)
    getTopic(id).then(res => console.log(res.data))
  }
  const logAll = () => {
    findAll().then(res => console.log(res.data))
  }

  return (
    <>
      <button onClick={createTopic}>Create Topic</button>
      <button onClick={logTopic}>Log Topic</button>
      <button onClick={logAll}>Log All</button>
    </>
  )
}

export default App
