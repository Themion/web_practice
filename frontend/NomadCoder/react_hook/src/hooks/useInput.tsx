import { ChangeEventHandler, useState } from "react"

export const useInput = (initialValue: string, validator: Function) => {
    const [value, setValue] = useState(initialValue)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { target: { value: val } } = e
        if (validator(val)) setValue(val)
    }
    return { value, onChange }
}
