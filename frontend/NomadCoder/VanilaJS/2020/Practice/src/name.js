// HTML 안의 여러 item들
const nameDiv = document.querySelector("div.name")

const nameForm = nameDiv.querySelector("form")
const nameInput = nameForm.querySelector("input")
const nameH4 = nameDiv.querySelector("h4")

// localStorage에서 사용자 이름을 저장할 공간
const USERNAME = 'username'// HTML 안의 여러 item들

// 사용자 이름을 페이지에 표시
function showName () {
    // form을 숨긴 뒤 이름 출력 공간을 공개
    nameForm.classList.add('hide')
    nameH4.classList.remove('hide')

    // 이름 출력 공간에 이름을 출력
    nameH4.innerHTML = `Hello, ${localStorage.getItem(USERNAME)}!`
}

// 사용자 이름을 입력받아 localStorage에 저장
function submitHandler (event) {
    // form의 기존 이벤트인 새로고침을 막은 뒤
    event.preventDefault()
    // localStorage에 사용자 이름을 저장
    localStorage.setItem(USERNAME, nameInput.value)
    // 이름을 입력받았으므로 사용자 이름을 출력한다
    showName()
}

// 사용자 이름을 입력받아 페이지에 표시
function nameHandler () {
    if (localStorage.getItem(USERNAME)) { // 사용자 이름이 localStorage에 있다면
        // 사용자 이름을 출력
        showName()  
    } else {                              // 　　　 　　　             　 없다면
        //사용자 이름을 form으로 입력받는다
        nameForm.addEventListener("submit", submitHandler)
    }
}

// 페이지 실행 시 가장 먼저 해야 할 작업들
function nameInit () {
    // 사용자 이름을 표시
    nameHandler()
}

nameInit();
