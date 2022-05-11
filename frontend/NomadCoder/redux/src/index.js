import { configureStore } from '@reduxjs/toolkit'

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const span = document.querySelector("span");

const TYPE_PLUS = 'plus'
const TYPE_MINUS = 'minus'

const setText = (val) => { span.innerText = val }

const reducer = (state = 0, action) => {
    if (action.type === 'plus') state++
    if (action.type === 'minus') state--
    setText(state)
    return state
}
const countStore = configureStore({ reducer: reducer })

plus.onclick = () => { countStore.dispatch({type: TYPE_PLUS}) }
minus.onclick = () => { countStore.dispatch({type: TYPE_MINUS}) }
