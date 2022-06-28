<template>

    <div class="menu">
        <a v-for="(menu, i) in menus" :key="i">{{ menu }}</a>
    </div>

    <img alt="Vue logo" src="./assets/logo.png">
    <div v-for="(product, i) in products" :key="i">
        <h4 :style="style">{{ i + 1 }}: {{ product.name }}</h4>
        <p>{{ product.price }}만원</p>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            products: [
                {name: '역삼동원룸', price: 60}, 
                {name: '천호동원룸', price: 70}, 
                {name: '마포구원룸', price: 55}, 
            ],
            menus: ['Home', 'Shop', 'About'],
            style: 'color: blue;',
        }  
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
