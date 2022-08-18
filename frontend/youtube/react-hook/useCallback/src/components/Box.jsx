import { useEffect } from "react"
import { useState } from "react"

const Box = ({createStyle}) => {
    const [style, setStyle] = useState({})

    useEffect(() => {
        console.log('Sizing box')
        setStyle(createStyle())
    }, [createStyle])

    return <div style={style}></div>
}

export default Box
