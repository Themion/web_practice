<!-- https://kr.vuejs.org/v2/style-guide/index.html -->

<script setup>
import Ball from './components/Ball.vue'
</script>
<script>
function getNumbers() {
  const candidates = Array(45).fill().map((v, i) => i + 1)
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
  data() {
    return {
      redo: false,
      wins: [0],
      bonus: null,
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  watch: {

  }
}
</script>

<template>
  <div>당첨 숫자</div>
  <div id="result">
    <Ball v-for="win in wins" :key="win" v-bind:value="win" />
  </div>
  <div>보너스</div>
  <Ball v-if="bonus" />
  <button v-if="redo"></button>
</template>

<style scoped>
</style>
