<template>
  <div class="container">
    <component :is="comName" @changeCont="changeCont"></component>
  </div>
</template>

<script>
import controlMain from './components/main'
import controlDetail from './components/detail'
export default ({
  name: 'controlLib',
  components: {
    controlMain,
    controlDetail
  },
  data () {
    return {
      comName: 'controlMain',
      row: {}
    }
  },
  methods: {
    changeCont (v) {
      this.row = v
      this.comName = 'controlDetail'
    }
  }
})
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
  }
</style>
