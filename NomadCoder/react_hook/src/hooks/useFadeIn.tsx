import { useEffect, useRef } from "react";

const useFadeIn = <T extends HTMLElement>(duration: number = 1) => {
    const element = useRef<T>(null);

    useEffect(() => {
        if (element.current) {
            const { current: { style } } = element
            style.transition = `opacity ${duration}s`
            style.opacity = '1'
        }
    }, [duration])

    return { ref: element, style: { opacity: 0 } }
}

export default useFadeIn
