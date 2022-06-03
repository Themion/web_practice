import { useEffect, useState } from "react"

export const useTitle = (initialTitle: string) => {
    const [title, setTitle] = useState(initialTitle)
    const updateTitle = () => {
        const element = document.querySelector("title") as HTMLTitleElement
        element.innerText = title
    }

    useEffect(updateTitle, [title])
    
    return setTitle
}
