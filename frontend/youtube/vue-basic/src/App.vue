<template>

    <div class="menu">
        <a v-for="(menu, i) in menus" :key="i">{{ menu }}</a>
    </div>

    <div v-for="(product, i) in products" :key="i">
        <h4 :style="style">{{ i + 1 }}: {{ product.name }}</h4>
        <p>{{ product.price }}만원</p>
        <button @click="report(product)">허위매물 신고</button>
        <span @mouseover="log">신고 수: {{ product.report }}</span>
    </div>

</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            products: [
                { name: '역삼동원룸', price: 60, report: 0 }, 
                { name: '천호동원룸', price: 70, report: 0 }, 
                { name: '마포구원룸', price: 55, report: 0 }, 
            ],
            menus: ['Home', 'Shop', 'About'],
            style: 'color: blue;',
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

</style>
