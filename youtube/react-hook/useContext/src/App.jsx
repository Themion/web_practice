import {useState} from 'react'
import './App.css'
import Page from './components/Page'
import { ThemeContext } from './context/ThemeContext'
import { UserContext } from './context/UserContext'

function App() {
    const [isDark, setDark] = useState(false)
    const name = 'useContext'
    return (
        <ThemeContext.Provider value={{isDark, setDark}}>
            <UserContext.Provider value={name}>
                <Page />
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App
