<script>
const WAITING = 'waiting'
const READY = 'ready'
const NOW = 'now'

// 화면과 관계 없는 변수는 data에 저장하지 않는다
let startTime = 0, timeout = null

export default {
  data() {
    return {
      result: [],
      state: WAITING,
      message: '클릭해서 시작하세요.',
    }
  },
  // 성능 향상을 위해 무거운 함수는 computed에 넣어 캐싱
  computed: {
    average() {
      return this.result.reduce((prev, curr) => prev + curr, 0) / this.result.length
    }
  },
  methods: {
    reset() {
      this.onNow()
      this.result = []
    },
    onWaiting() {
      this.message = '초록색이 되면 클릭하세요.'
      this.state = READY

      timeout = setTimeout(() => {
        this.state = NOW
        this.message = '클릭!'
        startTime = new Date().getTime()
      }, Math.floor(Math.random() * 1000) + 2000)
    },
    onReady() {
      startTime = 0
      clearTimeout(timeout)
      this.message = '너무 빨랐습니다. 초록색이 된 후에 클릭하세요.'
      this.state = NOW
    },
    onNow() {
      if (startTime !== 0) {
        this.result.push(new Date().getTime() - startTime)
        startTime = 0
      }
      this.message = '클릭해서 시작하세요.'
      this.state = WAITING
    },
    onClick() {
      switch (this.state) {
        case WAITING:       return this.onWaiting()
        case READY:         return this.onReady()
        case NOW: default:  return this.onNow()
      }
    }
  }
}
</script>

<template>
  <!-- <div id="screen" v-bind:class="state">{{message}}</div> -->
  <div id="screen" :class="state" @click="onClick">{{ message }}</div>
  <template v-if="result.length">
    <div>평균 시간: {{average}}ms</div>
    <button @click="reset">리셋</button>
  </template>
  <!-- <div v-show="result.length">
    <div>평균 시간: {{average}}ms</div>
    <button @click="reset">리셋</button>
  </div> -->
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

#screen.now {
  background-color: greenyellow;
}
</style>
