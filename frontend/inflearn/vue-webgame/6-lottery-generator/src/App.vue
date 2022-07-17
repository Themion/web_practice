<!-- https://kr.vuejs.org/v2/style-guide/index.html -->

<script setup>
import Ball from './components/Ball.vue'
</script>
<script>
export default {
  data() {
    return {
      redo: false,

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
    <Ball v-for="ball in winBalls" :key="ball.id" />
  </div>
  <div>보너스</div>
  <Ball v-if="bonus" />
  <button v-if="redo"></button>
</template>

<style scoped>
</style>
