<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Microsoft YaHei, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #666;
    overflow: hidden;
  }
  ul,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  html, body, #app {
    height: 100%;
  }
</style>
