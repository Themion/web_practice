const body = document.querySelector("body")

const IMAGE = 8
let num = IMAGE

//백그라운드 이미지의 번호를 받아 백그라운드를 설정
function set_bg () {
    num = (num === IMAGE) ? Math.floor(Math.random() * IMAGE) : (num + 1) % IMAGE
    //이미지 객체를 생성한 뒤 이미지와 클래스를 지정
    const image = new Image()
    image.src = `./src/images/${num}.jpg`
    image.classList.add('bg')

    //페이지의 백그라운드로 추가
    body.appendChild(image)
}

//images 폴더 안의 랜덤한 이미지를 백그라운드로 설정
function init () {
    set_bg()
    //60초에 한 번씩 배경화면을 새로 불러옴
    setInterval(set_bg, 1000 * 60);
}

init()