<template>
  <div class="tabs-wrapper">
    <el-tabs
      class="nav-tabs"
      v-model="activeTab"
      @tab-click="handleClick"
      @tab-remove="removeTab"
      type="border-card"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.routeName"
        :name="item.routeName"
        :label="item.title"
        :closable="item.routeName !== homeName"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown class="tabs-opr" trigger="click" @command="handleCommand">
      <div class="el-dropdown-link">标签操作</div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default ({
  name: 'tabs',
  data () {
    return {
      activeTab: '',
      maxTab: 15,
      homeName: 'home'
    }
  },
  created () {
    this.addTab({
      title: '首页',
      path: '/home',
      routeName: this.homeName,
      name: ''
    })
    this.setTabs(this.$route)
  },
  computed: {
    ...mapState(['tabsList'])
  },
  watch: {
    '$route': {
      handler (route) {
        console.log(route)
        this.setTabs(route)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['addTab', 'delTab', 'updateTabsList']),
    setTabs (route) {
      let routeName = route.meta.title ? route.name : route.matched[1].name
      const isExist = this.tabsList.some((item, index) => {
        if (item.routeName === routeName) {
          if (!route.meta.title) {
            this.tabsList[index].path = route.fullPath
          }
          return true
        }
        return false
      })
      if (!isExist) {
        if (this.tabsList.length >= this.maxTab) {
          this.delTab(1)
        }
        let routeData = {
          title: route.meta.title ? route.meta.title : route.matched[1].meta.title,
          path: route.fullPath,
          routeName: routeName,
          name: route.matched[1].components.default.name
        }
        this.addTab(routeData)
      }
      this.activeTab = routeName
    },
    handleClick (tab, event) {
      if (this.judgeTabName(tab.name)) {
        return
      }
      this.tabsList.forEach((item, index) => {
        if (item.routeName === tab.name) {
          this.activeTab = tab.name
          this.$router.push(item.path)
        }
      })
    },
    removeTab (tabName) {
      this.tabsList.forEach((tab, index) => {
        if (tab.routeName === tabName) {
          if (this.judgeTabName(tabName)) {
            let preTab = this.tabsList[index - 1] || this.tabsList[index + 1]
            if (preTab) {
              this.activeTab = preTab.routeName
              this.$router.push(preTab.path)
            }
          }
          this.delTab(index)
        }
      })
    },
    judgeTabName (tabName) {
      return this.$route.meta.title ? this.$route.name === tabName : this.$route.matched[1].name === tabName
    },
    handleCommand (command) {
      if (command === 'closeAll') { // 关闭所有
        let data = this.tabsList.splice(0, 1)
        this.updateTabsList(data)
        this.activeTab = data[0].routeName
        this.$router.push(data[0].path)
      } else if (command === 'closeOther') { // 关闭其他
        if (this.activeTab === this.homeName) {
          this.updateTabsList([this.tabsList[0]])
          return
        }
        this.tabsList.forEach((item, index) => {
          if (item.routeName === this.activeTab) {
            let arr = []
            arr.push(this.tabsList[0])
            arr.push(item)
            this.updateTabsList(arr)
          }
        })
      }
    }
  }
})
</script>

<style lang="less" scoped>
.tabs-wrapper {
  /*height: 40px;*/
  overflow: hidden;
  padding-right: 76px;
  position: relative;
}
.nav-tabs.el-tabs--border-card {
  height: 40px;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.tabs-opr {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #e6f7ff;
  }
}
</style>

<style lang="less">
.tabs-wrapper {
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 38px;
  }
}
</style>
