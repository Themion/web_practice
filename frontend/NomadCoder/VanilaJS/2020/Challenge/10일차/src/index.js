// HTML 안의 여러 항목들
const range = document.querySelector("h2")
const slide = document.querySelector("input.slide")
const btn = document.querySelector("button")
const input = document.querySelector("input.number")
const result = document.querySelector(".result")

// 랜덤으로 생성할 숫자의 최대치를 slide를 이용해 지정
function set_max (event) {
    // 페이지에 숫자의 최대치를 명시한 뒤 input의 최대치를 수정
    range.innerText = `Choose a number between 0 and ${event.target.value}`
    input.max = event.target.value
}

// submit했을 때 게임 진행
function show_result(event) {
    // 새로고침하는 것을 막은 뒤
    event.preventDefault()

    // 사용자가 값을 입력하지 않았다면 경고를 띄우고 함수를 끝낸다
    if (input.value == '') {
        alert('Please enter your number!')
        result.innerHTML = ''
        return
    }

    // input의 값을 숫자로 바꾼 뒤, 지정된 범위 내에서 정수를 하나 고른다
    const val = parseInt(input.value)
    const ans = Math.floor(Math.random() * (parseInt(slide.value) + 1))
    //결과창에 표시할 값을 span 안에 넣어 표시
    const nums = document.createElement("span")
    const res = document.createElement("span")

    //내가 고른 숫자와 랜덤으로 고른 숫자를 출력
    nums.innerText = `You chose: ${val}, the machine chose: ${ans}.\n`

    //두 숫자가 같다면 이겼음을, 다르다면 졌음을 알린다
    res.classList.add('bold')
    res.innerText = `You ${val === ans ? 'Won' : 'Lost'}!\n`

    //결과창에 두 숫자의 값과 일치 여부를 출력한다
    result.innerHTML = ''
    result.appendChild(nums)
    result.appendChild(res)
}

function init() {
    slide.addEventListener('input', set_max)
    btn.addEventListener('click', show_result)
}

init()