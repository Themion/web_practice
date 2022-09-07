import { configureStore } from '@reduxjs/toolkit'

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const span = document.querySelector("span");

const TYPE_PLUS = 'plus'
const TYPE_MINUS = 'minus'

const countReducer = (state = 0, action) => {
    // action은 항상 type값을 지닌 object여야 한다
    switch (action.type) {
        case TYPE_PLUS: return ++state
        case TYPE_MINUS: return --state
        default: return state
    }
}
const countStore = configureStore({ reducer: countReducer })

const setText = () => { span.innerText = countStore.getState() }

countStore.subscribe(setText)

plus.onclick = () => { countStore.dispatch({type: TYPE_PLUS}) }
minus.onclick = () => { countStore.dispatch({type: TYPE_MINUS}) }

setText()
