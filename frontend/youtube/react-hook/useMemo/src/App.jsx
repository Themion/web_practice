import { useState } from 'react'

const hardCalculate = (number) => {
    for (let i = 0; i < 999999999; i++) {}
    return number + 10000
}

const easyCalculate = (number) => number + 1

function App() {
    const [hardNumber, setHardNumber] = useState(1)
    const [easyNumber, setEasyNumber] = useState(1)

    const hardSum = hardCalculate(hardNumber)
    const easySum = easyCalculate(easyNumber)

    const onHardChange = (e) => setHardNumber(parseInt(e.target.value))
    const onEasyChange = (e) => setEasyNumber(parseInt(e.target.value))

    return (
        <div className="App">
            <div>
                <h3>어려운 계산기</h3>
                <input
                    type="number"
                    value={hardNumber}
                    onChange={onHardChange} />
                <span> + 10000 = {hardSum}</span>
            </div>
            <div>
                <h3>쉬운 계산기</h3>
                <input
                    type="number"
                    value={easyNumber}
                    onChange={onEasyChange} />
                <span> + 1 = {easySum}</span>
            </div>
        </div>
    )
}

export default App
