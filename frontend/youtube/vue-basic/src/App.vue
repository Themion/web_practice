<template><div>

    <div class="black-bg" v-if="modal">
        <div class="white-bg">
            <h4>상세 페이지</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quibusdam iste voluptatem, tempora unde commodi a praesentium minima doloribus delectus quam at dolorem vel voluptatum nemo sapiente hic voluptate tempore.</p>
            <button class="white-bg btn" @click="modal = false">X</button>
        </div>
    </div>

    <div class="menu">
        <a v-for="(menu, i) in menus" :key="i">{{ menu }}</a>
    </div>

    <div v-for="(product, i) in products" :key="i">
        <img class="room-img" :src="product.img" @click="modal = true">
        <h4 :style="style">{{ i + 1 }}: {{ product.name }}</h4>
        <p>{{ product.price }}만원</p>
        <button @click="report(product)">허위매물 신고</button>
        <span @mouseover="log">신고 수: {{ product.report }}</span>
    </div>

</div></template>

<script>

export default {
    name: 'App',
    data() {
        return {
            products: [
                { name: '역삼동원룸', price: 60, report: 0, img: require('@/assets/room/room0.jpg') }, 
                { name: '천호동원룸', price: 70, report: 0, img: require('@/assets/room/room1.jpg') }, 
                { name: '마포구원룸', price: 55, report: 0, img: require('@/assets/room/room2.jpg') }, 
            ],
            menus: ['Home', 'Shop', 'About'],
            style: 'color: blue;',
            modal: false,
        }  
    },
    methods: {
        report(product) { product.report++ },
        log() { console.log('log') },
    },
    components: {
    }
}
</script>

<style>

body {
    margin: 0;
}

div {
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.menu {
    background-color: darkslateblue;
    padding: 15px;
    border-radius: 5px;
}

.menu a {
    color: white;
    padding: 10px;
}

.room-img {
    width: 100%;
    margin-top: 40px;
}

.black-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    padding: 20px;
}

.white-bg {
    width: 100%;
    background: white;
    position: relative;
    border-radius: 8px;
    padding: 20px;
}

button.btn {
    border: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
}

</style>
