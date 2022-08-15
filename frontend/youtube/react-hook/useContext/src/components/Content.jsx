import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Content = () => {
    const {name, isDark} = useContext(ThemeContext)

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
