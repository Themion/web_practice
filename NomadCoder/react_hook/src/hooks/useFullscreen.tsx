import { useRef } from "react"

const useFullscreen = <T extends HTMLElement>(callback?: Function) => {
    const element = useRef<T>(null)
    const triggerFull = () => {
        if (element.current) {
            element.current.requestFullscreen()
            if (callback) callback(true)
        }
    }
    const exitFull = () => {
        document.exitFullscreen()
        if (callback) callback(false)
    }
    
    return { element, triggerFull, exitFull }
}

export default useFullscreen
