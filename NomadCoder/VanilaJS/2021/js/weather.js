const weather = document.querySelector("#weather span:first-child")
const city = document.querySelector("#weather span:last-child")

const API_KEY = '6376a8b04072b91f6098dae1a13c2598'

function onGeoOk (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    
    const url  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            weather.innerText = data.weather[0].main
            city.innerText = data.name
        })
}

function onGeoError () {
    alert("Error finding location: We can't find you!")
}

const coord = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
