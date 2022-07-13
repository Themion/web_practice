<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit="onSubmit">
            <input type="text" maxlength="4" v-model="value" ref="answer">
        </form>
        <div>시도: {{time}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                result: '',
                time: 0,
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
                
            }
        }
    }
</script>

<style>
</style>