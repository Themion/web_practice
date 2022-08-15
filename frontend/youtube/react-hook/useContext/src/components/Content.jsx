import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { UserContext } from "../context/UserContext"

const Content = () => {
    const { isDark } = useContext(ThemeContext)
    const name = useContext(UserContext)

    return (
        <div 
            className="content"
            style={{
                backgroundColor: isDark ? 'black' : 'white',
                color: isDark ? 'white' : 'black',
            }}>
            <p>Have a nice day, {name}</p>
        </div>
    )
}

export default Content
