import { ChangeEventHandler, useState } from "react"

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }
    return { value, onChange }
}
