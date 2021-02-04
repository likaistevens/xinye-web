<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {

    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.el-table td, .el-table th.is-leaf{
  background: rgb(217, 236, 255);
}
// 公用样式
.svg {
  position: relative;
  top: -4px;
}
</style>
