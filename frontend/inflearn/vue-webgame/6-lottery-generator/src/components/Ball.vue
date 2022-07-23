<script>
export default {
  name: 'Ball',
  props: {
    value: Number,
  },
  data() {
  },
  computed: {
    backGround() {
      let background = (() => {
        switch (parseInt(this.value / 10)) {
          case 0: return 'red'
          case 1: return 'orange'
          case 2: return 'yellow'
          case 3: return 'green'
          case 4: return 'blue'
          default: return 'grey'
        }
      })()
      return { background }
    }
  }
}
</script>

<template>
  <div class="ball" :style="backGround">{{value}}</div>
</template>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
