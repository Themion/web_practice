import { useEffect } from "react"

const mouseleave = 'mouseleave'

const useBeforeLeave = (onBefore: Function) => {
    const handle = (e: MouseEvent) => { 
        const { clientY } = e

        console.log(e)
        if (clientY <= 0) onBefore() 
    }
    useEffect(() => {
        document.addEventListener(mouseleave, handle)
        return () => document.removeEventListener(mouseleave, handle)
    }, [])
}

export default useBeforeLeave
