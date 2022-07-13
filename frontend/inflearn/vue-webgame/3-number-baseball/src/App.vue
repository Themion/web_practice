<template>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmit">
        <input 
            type="number" 
            min='1000'
            max='9999'
            v-model="value" 
            ref="answer">
    </form>
    <div>남은 시도: {{10 - tries.length}}</div>
    <ul>
        <li v-for="t in tries">
            <div>{{t.try}}</div>
            <div>strike: {{t.result.strike}}, ball: {{t.result.ball}}</div>
        </li>
    </ul>
</template>

<script>
    const LEN = 4

    const setValue = () => {
        let ret = ''
        for (let i = 0; i < LEN; i++)
            ret += Math.floor(Math.random() * 9 + 1)
        console.log(ret.split(''))
        return ret.split('')
    }

    export default {
        data() {
            return {
                answer: setValue(),
                value: '',
                result: '',
                tries: [],
            }
        },
        methods: {
            onSubmit(e) {
                const map = new Map()
                const val = (this.value + '').split('')

                let strike = 0, ball = 0

                val.forEach(v => {
                    if (map[v] === undefined) map[v] = 0
                    map[v]++
                })
                this.answer.forEach(a => {
                    if (!map[a]) map[a]--
                })

                for (let i = 0; i < LEN; i++) {
                    const result = this.strikeOrBall(val[i], i)
                    console.log(result)
                    if (result.strike) strike++
                    else if (result.ball) ball++
                }

                this.tries.push({
                    try: this.value,
                    result: {strike, ball}
                })

                if (strike == 4) this.result = 'Correct!'
                else if (this.tries.length == 10)
                    this.result = `The answer was ${this.answer}`

                this.value = ''
                this.$refs.answer.focus()
            },

            strikeOrBall(val, pos) {
                let strike = false, ball = false
                for (let i = 0; i < LEN; i++) 
                    if (val === this.answer[i]) {
                        if (i === pos) strike = true
                        else ball = true
                    }

                return { strike, ball }
            }
        }
    }
</script>

<style>
</style>