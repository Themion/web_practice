import { useEffect, useState } from "react"

const scroll = () => { return { x: window.scrollX, y: window.scrollY } }

const useScroll = () => {
    const [state, setState] = useState(scroll())

    const onScroll = (e: Event) => setState(scroll())

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return state
}

export default useScroll
