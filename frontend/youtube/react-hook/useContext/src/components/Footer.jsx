const Footer = ({isDark, setDark}) => {
    const toggleDark = () => setDark(!isDark)

    return (
        <footer 
            className="footer"
            style={{
                backgroundColor: isDark ? 'black' : 'lightgray',
                color: isDark ? 'white' : 'black',
            }}>
            <button className="button" onClick={toggleDark}>
                Dark mode
            </button>
        </footer>
    )
}

export default Footer
