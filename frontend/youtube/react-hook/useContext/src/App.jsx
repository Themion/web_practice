import {useState} from 'react'
import './App.css'
import Page from './components/Page'

function App() {
    const [isDark, setDark] = useState()
    const name = 'useContext'
    return <Page isDark={isDark} setDark={setDark} name={name} />
}

export default App
