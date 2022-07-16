<script>
const ROCK = '바위'
const SCISSOR = '가위'
const PAPER = '보'
const imgPos = {
  [ROCK]: '0',
  [SCISSOR]: '-142px',
  [PAPER]: '-284px'
}

export default {
  data() {
    return {
      myState: ROCK,
      cpuState: ROCK,
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
    setMyState(val) { this.myState = val }
  },

}
</script>

<template>
  <div id="computer" :style="ImgUrl"></div>
  <div>
    <button @click="setMyState(SCISSOR)">가위</button>
    <button @click="setMyState(ROCK)">바위</button>
    <button @click="setMyState(PAPER)">보</button>
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
