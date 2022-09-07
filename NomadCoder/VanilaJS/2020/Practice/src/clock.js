// HTML 안의 여러 item들
const clockDiv = document.querySelector("div.clock")

const clockH1 = clockDiv.querySelector("span.clock");

// 페이지에 현재 시간을 초 단위로 표시
function timeHandler () {
    // 현재 시간을 가져와서
    const time = new Date()
    // 시/분/초를 두 자리 문자열로 맞춘 뒤
    const hr = (time.getHours() < 10 ? '0' : '') + time.getHours()
    const min = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
    /* const sec = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
    // 페이지에 출력
    clockH1.innerHTML = `${hr}:${min}:${sec}` */
    clockH1.innerHTML = `${hr}:${min}`
}

// 페이지 실행 시 가장 먼저 해야 할 작업들
function clockInit () {
    // 현재 시간을 표시
    timeHandler()
    // setInterval을 이용해 timeHandler를 1밀리초마다 실행
    setInterval(timeHandler, 100);
}

clockInit()