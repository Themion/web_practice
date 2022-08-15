import {useState} from 'react'
import './App.css'
import Page from './components/Page'
import { ThemeContext } from './context/ThemeContext'

function App() {
    const [isDark, setDark] = useState(false)
    const name = 'useContext'
    return (
        <ThemeContext.Provider value={{isDark, setDark, name}}>
            <Page />
        </ThemeContext.Provider>
    )
}

export default App
