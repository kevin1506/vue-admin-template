<template>
  <div>
    <div>
        <el-input
          placeholder="请输入内容"
          class="search-box"
          v-model="searchVal">
          <i slot="suffix" class="el-icon-circle-close"
              @click.stop="searchVal=''"
              v-if="!!searchVal"></i>
          <i slot="prefix" class="el-input__icon el-icon-search searchbox" @click.stop="loadTable"></i>
        </el-input>
        <el-button type="primary" @click="loadTable">查询</el-button>
        <el-button type="primary" plain class="pull-right" @click="delMuch">删除</el-button>
        <el-button type="primary" plain icon="el-icon-plus" class="pull-right" @click="openAddView">创建项目</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="changeTable"
      height="630">
      <!-- @selection-change="handleSelectionChange" -->
      <el-table-column
        type="selection"
        :selectable='selectItem'
        disabled="true"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="项目id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="120">
      </el-table-column>
      <el-table-column
        label="项目来源"
        >
        <template slot-scope="scope">
          <span v-if="scope.row.sourceFrom === 1">自建</span>
          <span v-else>{{ scope.row.sourceFrom }}</span>
        </template>
        <!-- show-overflow-tooltip -->
      </el-table-column>
      <el-table-column
        prop="code"
        label="项目编码">
      </el-table-column>
      <el-table-column
        width="500"
        prop="remark"
        show-overflow-tooltip
        label="项目描述">
      </el-table-column>
      <el-table-column
        label="发布状态">
        <template slot-scope="scope">
          <i v-if="scope.row.publish" class="el-icon-check"></i> 
          <i v-else class="el-icon-close"></i> 
      </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" class="mr-10" :disabled="scope.row.publish === 1" @click="delProject(scope.row.id)">删除</el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openEditView(scope.row)">修改</el-dropdown-item>
              <el-dropdown-item @click.native="cloneProject(scope.row.id)">克隆</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.publish" @click.native="push(scope.row.id, 0)">取消发布</el-dropdown-item>
              <el-dropdown-item v-else @click.native="push(scope.row.id, 1)">发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column
        label="开发画面">
        <template slot-scope="scope">
          <!-- <router-link to="" class="mr-10" @click="openEditor(scope.row)">电脑画面</router-link> -->
          <span class="link" @click="openEditor(scope.row)">电脑画面</span>
          <!-- <router-link to="">手机画面</router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="table-pages"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>


    <el-dialog :title="add?'添加项目':'修改项目'" width="570px" :visible.sync="addProjectView">
      <el-form :model="form"  ref="from" :rules="formRules" :hide-required-asterisk="true">
        <!-- <h3>项目信息</h3> -->
        <!-- <el-form-item label="默认开通">
          <el-radio-group v-model="form.status">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="项目编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- <h3>作者信息</h3>
        <el-form-item label="云账号">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="作者名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
          <el-switch
            v-model="value1"
            inactive-text=""
            active-text="第三方可见">
          </el-switch>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
          <el-switch
            v-model="value2"
            inactive-text=""
            active-text="第三方可见">
          </el-switch>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
          <el-switch
            v-model="value3"
            inactive-text=""
            active-text="第三方可见">
          </el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProjectView = false">取 消</el-button>
        <el-button v-if="add" type="primary" @click="addProject('from')">确 定</el-button>
        <el-button v-else type="primary" @click="editProject('from')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { projectStore, queryByPage, deleteById, updateById, clone, publishById, batchDeleteById } from '@/api/projectHub'
  export default {
    name: 'myproject',
    data() {
      return {
        searchVal: '',
        pageSize: 10,
        currentPage: 1,
        total: 0,
        selection: null,
        tableData: [
          // {
          //   code: "123",
          //   createTime: "2019-11-04 11:46:08",
          //   descript: null,
          //   favorite: 0,
          //   getFrom: 1,
          //   id: 529,
          //   name: "123图_copy",
          //   parent: null,
          //   ppId: 901030996,
          //   proType: 1,
          //   projectCompanyId: 142,
          //   publish: 1,
          //   reviceTime: "2019-11-04 11:44:51",
          //   right: 0,
          //   rightFrom: 901030996,
          //   rightFromName: "广东睿佳",
          //   status: "1",
          //   typeId: null
          // },
          // {
          //   code: "2019project",
          //   createTime: "2019-11-04 11:40:49",
          //   descript: "2019项目1",
          //   favorite: 0,
          //   getFrom: 1,
          //   id: 528,
          //   name: "2019项目1",
          //   parent: null,
          //   ppId: 901030996,
          //   proType: 1,
          //   projectCompanyId: 141,
          //   publish: 0,
          //   reviceTime: "2019-11-04 11:40:49",
          //   right: 0,
          //   rightFrom: 901030996,
          //   rightFromName: "广东睿佳",
          //   status: "1",
          //   typeId: null
          // }
        ],
        add: true,
        selectRow: null,
        addProjectView: false,
        value1: true,
        value2: true,
        value3: true,
        form: {
          projectName: '',
          code: '',
          remark: ''
        },
        formRules: {
            code: [
              {required: true, message: '请输入项目编码', trigger: 'blur'},
            ],
            projectName: [
              {required: true, message: '请输入项目名称', trigger: 'blur'},
            ],
        }
      }
    },
    mounted() {
      this.loadTable()
    },
    watch: {
      searchVal () {
        this.loadTable()
      }
    },
    methods: {
      changeTable (selection) {
        this.selection = null
        if (selection.length) {
          let ids = selection.map((v) => {
            return v.id
          })
          this.selection = ids
          console.log(this.selection)
        }
      },
      selectItem (row) {
        return row.publish !== 1
      },
      handleSizeChange (e) {
        this.pageSize = e
      },
      handleCurrentChange (e) {
        this.currentPage = e
      },
      addProject (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addProjectView = false
            let params = JSON.stringify(this.form)
            projectStore(params).then((res) => {
              if (res.success) {
                this.loadTable()
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            return false
          }
        })
      },
      loadTable () {
        let path = `?pageNo=${this.currentPage}&pageSize=${this.pageSize}`
        let params = {}
        if (this.searchVal) {
          params = {keyword: this.searchVal}
        }
        queryByPage(path, params).then((res) => {
          if (res.code === 200) {
            this.tableData = res.obj.list
            this.total = res.obj.total
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      delProject (id) {
        deleteById(id).then((res) => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: '删除成功。',
              type: 'success'
            })
            this.loadTable()
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      openAddView () {
        this.add = true
        this.addProjectView = true
        this.$nextTick(() => {
          let data = {
            code: '',
            projectName: '',
            remark: ''
          }
          this.form = data
        })
      },
      openEditView (row) {
        console.log(row)
        this.add = false
        this.addProjectView = true
        this.$nextTick(() => {
          // this.$refs.form.resetFields()
          let data = {
            code: row.code,
            // id: row.id,
            projectName: row.projectName,
            // publish: row.publish,
            remark: row.remark
          }
          this.selectRow = row
          this.form = data
        })
      },
      editProject (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addProjectView = false
            let data = Object.assign({id: this.selectRow.id, publish: this.selectRow.publish}, this.form)
            updateById(data).then((res) => {
              if (res.success) {
                this.$message({
                  showClose: true,
                  message: '更新成功。',
                  type: 'success'
                })
                this.loadTable()
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            return false
          }
        })
      },
      cloneProject (id) {
        clone(id).then((res) => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: '克隆成功。',
              type: 'success'
            })
            this.loadTable()
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      push (id, status) {
        let path = `?id=${id}&publishState=${status}`
        publishById(path).then((res) => {
          if (res.code === 200) {
            this.loadTable()
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      delMuch () {
        if (!this.selection) {
          this.$message({
            showClose: true,
            message: '请选择要删除的项目。',
            type: 'error'
          })
          return
        }
        batchDeleteById({ids: this.selection}).then((res) => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: '删除成功。',
              type: 'success'
            })
            this.loadTable()
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
        // console.log(this.selection)
      },
      openEditor (row) {
        let ip = window.GlobalConfig.webUrl
        window.open(`${ip}/view/index.html?id=${row.id}&name=${row.projectName}`, '_blank')
        // console.log(window.GlobalConfig.webUrl)
      }
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .el-input__suffix{
    line-height: 40px;
  }
  /deep/ .el-input{
    width: 300px;
    margin-right: 16px;
  }
  /deep/ .el-pagination__editor.el-input{
    width: 50px;
  }
  /deep/ .el-pagination{
    text-align: right;
    padding-top: 16px;
  }
  /deep/ .el-form-item__label{
    width: 80px;
  }
  /deep/ .el-textarea {
    width: 300px;
  }
  /deep/ .el-table td, /deep/ .el-table th{
    padding: 8px 0;
  }
  .mr-10{
    margin-right: 10px;
  }
  .pull-right{
    float: right;
  }
  .link {
    color: #4c89ac!important;
    text-decoration: underline;
    cursor: pointer;
  }
  /deep/ .el-form-item.is-required .el-form-item__label:before{
    content: '*';
    color: red
  }
  /deep/ .el-form-item__error{
    left: 80px;
  }
</style>
