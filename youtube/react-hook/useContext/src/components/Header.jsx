import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { UserContext } from "../context/UserContext"

const Header = () => {
    const { isDark } = useContext(ThemeContext)
    const name = useContext(UserContext)

    return (
        <header 
            className="header"
            style={{
                backgroundColor: isDark ? 'black' : 'lightgray',
                color: isDark ? 'white' : 'black',
            }}>
            <h1>Welcome {name}!</h1>
        </header>
    )
}

export default Header
