<template>
  <div class="header">
    <div class="btn-fold-menu left" @click.prevent="onTurnLnav">
      <span :class="['iconfont', isSwitch ? 'icon-open-nav' : 'icon-fold-nav']"></span>
    </div>
    <div class="right-cpt right">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link">
          欢迎，admin
        </div>
        <el-dropdown-menu class="dropdown-header" slot="dropdown">
          <el-dropdown-item command="set">设置&nbsp;</el-dropdown-item>
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      isSwitch: false,
      isudp: false
    }
  },
  methods: {
    onTurnLnav () {
      this.isSwitch = !this.isSwitch
      this.$emit('onPassOnPar', this.isSwitch)
    },
    mouseInUser () {
      this.isudp = true
    },
    mouseOutUser () {
      this.isudp = false
    },
    handleCommand (command) {
      if (command === 'signOut') {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .btn-fold-menu {
    height: 100%;
    line-height: 60px;
    width: 60px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #e6f7ff;
    }
    .iconfont {
      font-size: 22px;
      color: #919191;
    }
  }
  .right-cpt {
    height: 100%;
    margin-right: 10px;
    position: relative;
  }
  .user-info {
    height: 60px;
    display: table-cell;
    padding: 0 12px;
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      background: #e6f7ff;
    }
  }
  .user-drop-down {
    position: absolute;
    right: 0;
    top: 60px;
    width: 160px;
    overflow: hidden;
    margin-top: 3px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 6px #ddd;
    z-index: 2001;
  }
  .user-option {
    padding: 12px 15px;
    cursor: pointer;
    &:hover {
      background: #e6f7ff;
    }
  }
  .uanimate-enter-active, .uanimate-leave-active {
    transition: all .2s
  }
  .uanimate-enter, .uanimate-leave-to {
    opacity: 0;
    // transform:scaleY(0);
    // transform-origin: center top 0px;
  }
  .dropdown-header {
    width: 150px;
  }
</style>

<style lang="less">
  .right-cpt {
    .el-dropdown-link {
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      padding: 0 10px;
      &:hover {
        background-color: #e6f7ff;
      }
    }
  }
</style>
