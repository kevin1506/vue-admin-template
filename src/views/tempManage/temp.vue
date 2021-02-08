<template>
  <div class="container">
    <component :is="comName" @changeCont="changeCont"></component>
  </div>
</template>

<script>
import tempMain from './components/main'
import tempDetail from './components/detail'
export default ({
  name: 'tempLib',
  components: {
    tempMain,
    tempDetail
  },
  data () {
    return {
      comName: 'tempMain',
      row: {}
    }
  },
  methods: {
    changeCont (v) {
      this.row = v
      this.comName = 'tempDetail'
    }
  }
})
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
  }
</style>
