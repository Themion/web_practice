import { useEffect } from "react"

const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => console.log('timer...'), 1000)
        return () => clearInterval(timer)
    }, [])
    return <div>
        <span>Starting timer: Check Browser Console!</span>
    </div>
}

export default Timer
