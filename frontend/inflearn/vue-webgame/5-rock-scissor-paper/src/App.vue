<script>
const imgPos = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}

let interval = null

export default {
  data() {
    return {
      myState: '',
      cpuState: '바위',
      result: '',
      score: 0,
    }
  },
  computed: {
    ImgUrl() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgPos[this.cpuState]} 0`
      }
    }
  },
  methods: {
    setMyState(val) { 
      this.myState = val
      clearInterval(interval)
    }
  },
  // created() {
  //   console.log('created')
  // },
  mounted() {
    console.log('mounted')
    interval = setInterval(() => {
      this.cpuState = ((state) => {
        switch (state) {
          case '바위': return '가위'
          case '가위': return '보'
          case '보': default: return '바위'
        }
      })(this.cpuState)
    }, 10);
  },
  beforeDestroy() { clearInterval(interval) },
}
</script>

<template>
  <div id="computer" :style="ImgUrl"></div>
  <div>
    <button @click="setMyState('가위')">가위</button>
    <button @click="setMyState('바위')">바위</button>
    <button @click="setMyState('보')">보</button>
  </div>
  <div>{{result}}</div>
  <div>현재 점수: {{score}}</div>
</template>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
