import { useEffect, useMemo, useState } from 'react'

function App() {
    const [number, setNumber] = useState(0)
    const [isKorea, setIsKorea] = useState(true)

    // useMemo를 이용해 불필요한 참조값 변경을 방지
    const location = useMemo(
        () => ({ country: isKorea ? '한국' : '외국' }),
        [isKorea]
    )

    // 의존성 배열은 객체를 값이 아닌 참조형으로 계산
    useEffect(() => {
        console.log('useEffect 호출')
    }, [location])

    return (
        <div className="App">
            <h2>하루에 몇끼 먹어요?</h2>
            <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} />
            <hr />
            <h2>어느 나라에 있어요?</h2>
            <p>나라: {location.country}</p>
            <button onClick={e => setIsKorea(!isKorea)}>
                비행기 타자
            </button>
        </div>
    )
}

export default App
