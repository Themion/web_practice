const imgs = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", 
              "4.jpg", "5.jpg", "6.jpg", "7.jpg"]

const bg = document.createElement("img")
bg.src = `img/${imgs[Math.floor(Math.random() * imgs.length)]}`
document.body.appendChild(bg)
