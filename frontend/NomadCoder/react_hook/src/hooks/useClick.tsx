import { useEffect, useRef } from "react"
import { OnMouseEvent } from "../types/types"

export const useClick = <T extends HTMLElement>(onClick: OnMouseEvent) => {
    const ClickEvent = 'click'
    const element = useRef<T>(null)

    useEffect(() => {
        if (element.current)
            element.current.addEventListener(ClickEvent, onClick)

        return () => {
            if (element.current)
                element.current.removeEventListener(ClickEvent, onClick)
        }
    }, [])

    return element
}
