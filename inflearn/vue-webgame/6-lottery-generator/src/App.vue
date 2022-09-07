<!-- https://kr.vuejs.org/v2/style-guide/index.html -->

<script>
  import Ball from './components/Ball.vue'

  function getNumbers() {
    const candidates = Array(45).fill().map((_, i) => i + 1)
    const shuffle = []

    while (candidates.length) {
      const pick = Math.floor(Math.random() * candidates.length)
      shuffle.push(candidates.splice(pick, 1)[0])
    }

    const bonus = shuffle[shuffle.length - 1]
    const wins = shuffle.slice(0, 6).sort((p, c) => p - c)

    return { wins, bonus }
  }

  export default {
    components: {
      Ball
    },
    data() {
      return {
        wins: [],
        bonus: null,
        timeouts: []
      }
    },
    methods: {
      setBalls() {
        const { wins, bonus } = getNumbers()

        wins.forEach((val, key) => {
          this.timeouts.push(
            setTimeout(() => this.wins.push(val), (key + 1) * 1000)
          )
        })

        this.timeouts.push(
          setTimeout(() => this.bonus = bonus, (wins.length + 1) * 1000)
        )
      },
      reset() {
        this.wins = []
        this.bonus = null
        this.timeouts = []
      }
    },
    mounted() {
      this.setBalls()
    },
    beforeDestroy() {
      this.timeouts.forEach(timeout => clearTimeout(timeout))
    },
    watch: {
      wins(value, oldValue) {
        if (value.length === 0) this.setBalls()
      }
    }
  }
</script>

<template>
  <div>당첨 숫자</div>
  <div id="result">
    <Ball v-for="win in wins" :key="win" v-bind:value="win" />
  </div>
  <div>보너스</div>
  <Ball v-if="bonus" :value="bonus" />
  <br />
  <button v-if="bonus" @click="reset">다시 하기</button>
</template>

<style scoped>
</style>