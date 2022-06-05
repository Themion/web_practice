import { useEffect, useState } from "react"

const useNetwork = (onChange?: Function) => {
    const [status, setStatus] = useState(navigator.onLine)

    useEffect(() => {
        const handleChange = () => {
            if (onChange) onChange(navigator.onLine)
            setStatus(navigator.onLine)
        }

        window.addEventListener('online', handleChange)
        window.addEventListener('offline', handleChange)

        return () => {
            window.removeEventListener('online', handleChange)
            window.removeEventListener('offline', handleChange)    
        }
    }, [])

    return status
}

export default useNetwork
