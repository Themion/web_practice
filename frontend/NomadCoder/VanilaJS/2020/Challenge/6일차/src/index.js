const select = document.querySelector("select");
const COUNTRY = "country";

// select에서 선택한 값이 바뀔 때 호출되는 handler
function changeHandler(event) {
  console.log(event.target.value)
  //선택된 항목의 value를 localStorage에 저장
  localStorage.setItem(COUNTRY, event.target.value);
}

//localStorage에서 값을 가져온 뒤
//해당 값이 유효한 값이라면 그 값을 select에서 선택한다
function selecteItem() {
  const item = select.querySelector(`option[value=${localStorage.getItem(COUNTRY)}]`);
  if (item) item.selected = true;
}

function init() {
  //select에서 값이 바뀔 때의 handler를 설정하고
  select.addEventListener("change", changeHandler);
  //select의 초기값을 바꾼다
  selecteItem();
}

init();
