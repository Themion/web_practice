import { useCallback, useState } from 'react'
import Box from './components/Box'

function App() {
    const [size, setSize] = useState(100)
    const [isDark, setIsDark] = useState(false)

    // size가 바뀔 때만 자식 컴포넌트 스타일 수정
    const createBoxStyle = useCallback(
        () => ({
            backgroundColor: 'pink',
            width: `${size}px`,
            height: `${size}px`
        }),
        [size]
    )

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
