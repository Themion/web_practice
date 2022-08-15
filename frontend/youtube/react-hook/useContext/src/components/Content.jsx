const Content = ({isDark, name}) => {
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
