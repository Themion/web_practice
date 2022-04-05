//창을 열었을 때의 브라우저의 너비
const init_width = width();
//배경색을 바꿀 경계를 init_width에 1 ± degree로 설정
const degree = 0.3;
//이전 과제에서 가져온 색
//과제 예시로 나온 색일 가능성이 커 가져옴
const colors = ["#f39c12", "#3498db", "#9b59b6"];

//브라우저의 너비를 출력
function width() {
  return window.innerWidth;
}

//body의 배경색을 colors[i]로 변경
function set_color(i) {
  document.body.style.background = colors[i];
}

//페이지에 표시할 아무 메세지
document.body.innerHTML = "<h2 style='color:white'>Hello!</h2>";
//초기 배경색을 설정함
set_color(2);

//브라우저의 사이즈에 따라 페이지의 배경색을 변경함
window.onresize = () => {
  if (width() >= init_width * (1 + degree)) set_color(0);
  else if (width() <= init_width * (1 - degree)) set_color(1);
  else set_color(2);
};
