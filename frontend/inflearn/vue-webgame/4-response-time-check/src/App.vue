<script>
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요'
    }
  },
  methods: {
    init() {

    }
  }
}
</script>

<template>
  <div id="screen" :class="state">{{ message }}</div>
  <!-- <div id="screen" v-bind:class="state">{{message}}</div> -->
  <div>
    <div>평균 시간: {{}}</div>
    <button @click="init">리셋</button>
  </div>
</template>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: white;
}

#screen.bow {
  background-color: greenyellow;
}
</style>
