// HTML 안의 여러 item들
const todoDiv = document.querySelector(".todo")

const todoForm = todoDiv.querySelector("form")
const todoInput = todoForm.querySelector("input")
const todoList = todoDiv.querySelector(".todo.list")

// localStorage에서 todo 항목들을 저장할 공간
const TODO_ITEM = 'todo'

let todo = []

// localStorage에 todo를 저장
function saveTodo () {
    localStorage.setItem(TODO_ITEM, JSON.stringify(todo))
}

// 할 일을 todo와 todoList에서 제거
function popTodoItem (event) {
    // 누른 버튼을 포함하는 할 일
    const li = event.target.parentNode
    // todoList에서 li를 제거
    todoList.removeChild(li)

    // todo에서 id가 li의 id와 다른 item만 가져와 todo에 저장
    todo = todo.filter((item) => { return item.id !== parseInt(li.id) })
    saveTodo()
}

// 할 일을 ul과 todo에 추가
function pushTodoItem (todoItem) {
    // ul에 표시할 item과 삭제 버튼을 생성
    const item_div = document.createElement('div')
    const btn = document.createElement('button')

    // 버튼의 텍스트와 margin을 추가
    btn.innerText = '❌'
    // 버튼을 눌렀을 때 할 일을 todo와 todoList에서 제거
    btn.addEventListener('click', popTodoItem)

    // item에 텍스트와 버튼, id를 추가
    item_div.innerText = todoItem.text
    item_div.classList.add('text')
    item_div.appendChild(btn)
    item_div.setAttribute('id', todoItem.id)

    // todoList에 item을 추가
    todoList.appendChild(item_div)
    // todo에 item을 추가
    todo.push(todoItem)
}

// todoForm에서 submit 이벤트가 일어났을 경우
function submitHandler (event) {
    // 페이지를 새로고침하는 것을 막음
    event.preventDefault()

    // 할 일에 생성시간을 id로 부여함
    const todoItem = {
        text: todoInput.value.trim(),
        id: new Date().getTime()
    }

    //할 일의 내용이 빈 문자열이라면 할 일을 추가하지 않는다
    if(todoItem === '') return;

    //변수 todo에 할 일을 push하고 저장한다
    pushTodoItem(todoItem)
    saveTodo()

    todoInput.value = ''
}

// localStorage에서 todo를 가져온다
function loadTodo () {
    // localStorage에 저장된 todo를 가져옴
    const localTodo = localStorage.getItem(TODO_ITEM)
    // 만일 가져온 todo가 valid한 값이라면
    if (localTodo) {
        // string 형태로 저장된 todo를 parse한 뒤
        const parseTodo = JSON.parse(localTodo)
        // todo의 각 아이템을 변수에 push한다
        parseTodo.forEach((parseItem) => { pushTodoItem(parseItem) })
    }
}

function todoInit () {
    loadTodo()
    todoForm.addEventListener('submit', submitHandler)
}

todoInit()