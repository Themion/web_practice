import { ChangeEvent, FormEvent, useState } from "react"

export const Home = () => {
    const [value, setValue] = useState("")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValue("")
    }

    return (
        <div>
            <h1>To Dos</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Write to do" 
                    value={value}
                    onChange={onChange} />
                <button>Add</button>
            </form>
            <ul></ul>
        </div>
    )
}
