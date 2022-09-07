import { ChangeEventHandler, useState } from "react"

const useInput = (initialValue: string, validator: Function) => {
    const [value, setValue] = useState(initialValue)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { target: { value: val } } = e
        if (validator(val)) setValue(val)
    }
    return { value, onChange }
}

export default useInput
