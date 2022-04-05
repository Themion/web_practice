// HTML 안의 여러 항목들
const display = document.querySelector('#display')
const C = document.querySelector('#C')

// 계산한 기록을 저장할 배열
const eq = [{ num: '', oper: ' ' }]

// 계산 결과를 저장할 변수
let val = undefined
// = 버튼을 여러 번 누를 때 마지막 계산을 반복
let is_last_oper_equal = false

//계산기의 현재 상태를 초기화
function reset () {
    eq.push({ num: '', oper: ' ' })
    val = undefined
    display.innerText = 0
    is_last_oper_equal = false
}

// 사칙연산 버튼, 혹은 = 버튼을 눌렀을 때 밀린 계산을 처리
function calculate (item) {
    // = 버튼을 중복해서 눌렀다면 직전 계산을 한 번 더 수행
    if (is_last_oper_equal && item === '=') eq.push(eq[eq.length - 1])

    // 사칙연산 버튼, 혹은 = 버튼을 누르기 직전 마지막으로 입력했던 수를 저장
    let temp = parseFloat(eq[eq.length - 1].num)
    
    //이미 밀린 계산을 처리했고 새로운 계산을 추가하려는 게 아니라면
    if (!(is_last_oper_equal && item !== '=')) {
        // 밀린 계산을 처리
        switch (eq[eq.length - 1].oper) {
            case '+': val += temp; break
            case '-': val -= temp; break
            case '×': val *= temp; break
            case '÷': val /= temp; break
            case ' ': val  = temp; break
            default: reset(); break
        }
    }

    // = 버튼을 누른 게 아니라면 다음에 계산할 사칙연산을 eq에 저장
    if (item !== '=') eq.push({ num: '', oper: item })

    //계산 결과를 페이지에 출력
    display.innerText = val
}

// 계산기의 초기화 버튼을 제외한 모든 버튼을 눌렀을 때
function button_listener (event) {
    // 누른 버튼의 종류를 상수로 저장
    const item = event.target.innerText

    // 누른 버튼이 사칙연산 버튼, 혹은 = 버튼일 경우 밀린 계산을 처리
    if ("+-×÷=".includes(item)) calculate(item)
    // 그렇지 않고 숫자 버튼인 경우
    else {
        // = 버튼을 누른 상태에서 숫자 버튼을 눌렀다면 초기화
        if (is_last_oper_equal) reset()
        // 입력된 수를 갱신하고 이를 페이지에 출력
        eq[eq.length - 1].num += item
        display.innerText = parseFloat(eq[eq.length - 1].num)
    }

    // 누른 버튼이 = 버튼인지를 확인
    is_last_oper_equal = item === '='
}

function init () {
    // 페이지에 존재하는 모든 버튼에 대해
    document.querySelectorAll('td').forEach((btn) => {
        // 버튼에 id가 존재하지 않는 경우, 즉 초기화 버튼이 아닌 경우 
        // click 이벤트 발생 시 button_listener 실행
        if (!btn.id) btn.addEventListener('click', button_listener)
    })
    // 초기화 버튼을 눌렀을 경우 초기화
    C.addEventListener('click', reset)
}

init() 