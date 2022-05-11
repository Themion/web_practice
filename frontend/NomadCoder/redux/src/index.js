import { configureStore } from '@reduxjs/toolkit'

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const span = document.querySelector("span");

const TYPE_PLUS = 'plus'
const TYPE_MINUS = 'minus'

const countReducer = (state = 0, action) => {
    if (action.type === TYPE_PLUS) state++
    if (action.type === TYPE_MINUS) state--
    return state
}
const countStore = configureStore({ reducer: countReducer })

const setText = () => { span.innerText = countStore.getState() }

countStore.subscribe(setText)

plus.onclick = () => { countStore.dispatch({type: TYPE_PLUS}) }
minus.onclick = () => { countStore.dispatch({type: TYPE_MINUS}) }

setText()
