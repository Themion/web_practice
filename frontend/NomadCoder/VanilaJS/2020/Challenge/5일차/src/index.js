// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;
const h = document.querySelector("h4");

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  //크리스마스 이브와 현재 시간의 차
  //값이 한국 표준시 기준으로 나와 NINE_HOURS_MILLISECONDS를 사용하지 않음
  const diff = xmasDay.getTime() - new Date().getTime();

  //diff에서 d/h/m/s/ms를 추출
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHr = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  const diffMilli = Math.floor(diff % 1000);

  //diff에서 추출한 데이터를 형식에 맞추어 h3에 표시
  h.innerText =
    `${diffDay}d ` +
    `${(diffHr < 10 ? "0" : "") + diffHr}h ` +
    `${(diffMin < 10 ? "0" : "") + diffMin}m ` +
    `${(diffSec < 10 ? "0" : "") + diffSec}s ` +
    //시, 분, 초와 다르게 밀리초는 세 자리 수까지 표현 가능
    `${(diffMilli < 10 ? "00" : diffMilli < 100 ? "0" : "") + diffMilli}`;
}

//setInterval을 이용해 getTime을 1밀리초마다 실행
function init() {
  setInterval(getTime, 1);
}
init();
