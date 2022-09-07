import { useState } from "react"
import { Content } from "../types/types"

const useTabs = (initialTab: number, allTabs: Content[]) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab)
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    }
}

export default useTabs
