import { useState } from 'react'
import Box from './components/Box'

function App() {
    const [size, setSize] = useState(100)
    const [isDark, setIsDark] = useState(false)

    const createBoxStyle = () => ({
        backgroundColor: 'pink',
        width: `${size}px`,
        height: `${size}px`
    })

    return (
        <div className="App" style={{
            background: isDark ? 'black' : 'white'
        }}>
            <input 
                type="number" 
                value={size}
                onChange={e => setSize(e.target.value)} />
            <button onClick={() => setIsDark(!isDark)}>
                Changing Theme
            </button>
            <Box createStyle={createBoxStyle} />
        </div>
    )
}

export default App
