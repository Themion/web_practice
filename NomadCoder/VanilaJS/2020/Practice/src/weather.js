const API_KEY = "6376a8b04072b91f6098dae1a13c2598"

const weather = document.querySelector("span.weather")
const COORD = 'coord'

// 위도/경도로 이루어진 좌표 crd를 받아 해당 좌표의 지명/날씨를 페이지에 표시
function get_weather (crd) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY}&units=metric`).then((response) => {
        // fetch해서 받아온 데이터 중 실제로 받아오고자 한 데이터 json에서
        return response.json()
    }).then((json) => {
        try {           // 온도와 지명을 가져와 페이지에 출력
            const temperature = json.main.temp
            const location = json.name
            weather.innerText = `${temperature}\'C\n${location}`
        } catch(Err) {  // 출력에 실패하면 요청 횟수 초과로 간주, 에러메세지를 페이지에 표시
            weather.innerText = 'OpenWeatherMap has been blocked due to being requested too often.'
        }
    })
}

// 현재 좌표 사용 동의를 받아냈다면
function geo_success (position) {
    // 현재 좌표를 추출하여 object로 저장
    const my_coord = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    // localStorage에 현재 좌표를 저장
    localStorage.setItem(COORD, JSON.stringify(my_coord))
    //현재 좌표를 바탕으로 날씨를 받아온다
    get_weather(my_coord)
}

// 위치 정보를 받아오는 것에 실패했다면
function geo_error () {
    // 콘솔에 로그를 찍는다
    console.log("Failed to get geoLocation")
}

// navigator를 이용해 현재 좌표를 받아온다
function get_coord () {
    navigator.geolocation.getCurrentPosition(geo_success, geo_error)
}

// localStorage에서 좌표를 가져오고
// 결과값에 따라 좌표값을 navigator로부터 얻어오거나 날씨를 출력
function load_coord () {
    const my_coord = localStorage.getItem(COORD)
    if (my_coord) get_weather(JSON.parse(my_coord))
    else get_coord()
}

function init () {
    load_coord()
    setInterval(load_coord, 1000 * 60 * 60)
}

init()