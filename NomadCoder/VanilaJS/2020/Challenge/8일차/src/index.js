// localStorage에서 항목들을 저장할 공간
const PENDING = 'pending'
const FINISHED = 'finished'

// HTML 안의 여러 item들
const form = document.querySelector("form")
const input = form.querySelector("input")

const p_list = document.querySelector(`ul.${PENDING}`)
const f_list = document.querySelector(`ul.${FINISHED}`)

// pending과 finished item을 저장할 배열
let p = [], f = []

// localStorage에 pending과 finished를 저장
function save () {
    localStorage.setItem(PENDING, JSON.stringify(p))
    localStorage.setItem(FINISHED, JSON.stringify(f))
}

// item을 한쪽 div에서 다른쪽 div로 이동
function move_item (event) {
    // 버튼을 포함하는 li
    const li = event.target.parentNode
    // li를 포함하는 ul의 첫 번쨰(유일한) class
    const html_class = li.parentNode.classList[0]

    // 한 쪽에서 pop한 item을 다른 쪽에 push한다
    push_item(
        pop_item(event), 
        (html_class === PENDING) ? FINISHED : PENDING,
        true
    )

    // 배열에 변화가 있었으므로 배열을 localStorage에 저장
    save()
}

// 할 일을 html과 배열에서 제거
function pop_item (event) {
    // 버튼을 포함하는 li
    const li = event.target.parentNode
    // li를 포함하는 ul의 첫 번쨰(유일한) class
    const html_class = li.parentNode.classList[0]

    // pop할 item을 li로부터 복원한다
    const ret = {
        text: li.childNodes[0].innerText,
        id: li.id
    }

    // 기존에 속한 ul에서 제거한 뒤 filter를 이용해 배열에서 걸러냄
    if (html_class === PENDING) {
        p_list.removeChild(li)
        p = p.filter((item) => { return item.id != parseInt(ret.id) })
    } else if (html_class === FINISHED) {
        f_list.removeChild(li)
        f = f.filter((item) => { return item.id != parseInt(ret.id) })
    }

    // 배열에 변화가 있었으므로 배열을 localStorage에 저장
    save()

    // move_item에서 사용하기 위해 복원한 item을 반환
    return ret
}

// 할 일을 ul과 todo에 추가
function push_item (item, html_class, if_save) {
    // item의 정보와 버튼을 묶는 li
    const li = document.createElement('li')

    // item의 정보와 삭제/이동 버튼
    const span = document.createElement('span')
    const del_btn = document.createElement('button')
    const chk_btn = document.createElement('button')

    // item의 정보를 span에 저장
    span.innerText = item.text

    // 삭제 버튼임을 표시하고 이벤트 리스너를 pop_item으로 설정
    del_btn.innerText = '❌'
    del_btn.addEventListener('click', pop_item)

    // 이동 버튼임을 표시하고 이벤트 리스너를 move_item으로 설정
    chk_btn.innerText = html_class == PENDING ? '✔️' : '⏪'
    chk_btn.addEventListener('click', move_item)

    // li에 span과 버튼을 차례대로 넣는다
    li.appendChild(span)
    li.appendChild(del_btn)
    li.appendChild(chk_btn)

    // li와 관련된 item의 id를 li의 id로 저장
    li.setAttribute('id', item.id)

    // 지정된 클래스와 배열에 item을 저장
    if (html_class == PENDING) {
        p_list.appendChild(li)
        p.push(item)
    } else if (html_class == FINISHED) {
        f_list.appendChild(li)
        f.push(item)
    }

    //저장해야 하는 경우에는 localStorage에 저장
    if (if_save) save()
}

// form에서 submit 이벤트가 일어났을 경우
function submit_handler (event) {
    // 페이지를 새로고침하는 것을 막고
    event.preventDefault()

    //할 일에 생성시간을 id로 부여
    const item = {
        text: input.value,
        id: new Date().getTime()
    }

    // 배열에 할 일을 push하고 저장
    push_item(item, PENDING, true)
    save()

    // 입력을 끝냈으므로 input 칸을 비움
    input.value = ''
}

//localStorage에 저장된 배열을 변수에 저장
function load(target) {
    //localStorage에서 배열을 가져온 뒤
    const local = localStorage.getItem(target)
    //배열이 valid하다면
    if (local) {
        //배열을 파싱한 뒤 배열의 클래스에 맞춰 push
        const parse = JSON.parse(local)
        parse.forEach((item) => { push_item(item, target, false) })
    }
}

//가장 먼저 실행할 사항들
function init () {
    //localStorage에서 배열을 불러온 뒤
    load(PENDING); load(FINISHED)
    //form의 handler를 지정
    form.addEventListener('submit', submit_handler)
}

init()