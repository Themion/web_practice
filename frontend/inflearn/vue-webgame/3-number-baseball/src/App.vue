<template>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmit">
        <input type="text" maxlength="4" v-model="value" ref="answer">
    </form>
    <div>시도: {{tries.length}}</div>
    <ul>
        <li v-for="t in tries">
            <div>{{t.try}}</div>
            <div>{{t.result}}</div>
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                result: '',
                tries: [],
            }
        },
        methods: {
            setValue() {
                this.value = ''
                for (let i = 0; i < 4; i++) 
                    this.value += `${Math.floor(Math.random() * 10)}`
            },
            onSubmit(e) {
                this.tries.push({
                    try: this.value,
                    result: 'homerun'
                })
                this.value = ''
                this.$refs.answer.focus()
            }
        }
    }
</script>

<style>
</style>