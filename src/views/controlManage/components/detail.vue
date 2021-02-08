<template>
  <div class="lib-container">
    <div class="top">
      <i class="el-icon-back" title="返回" @click="backUpLevel"></i>
      <span class="txt">控件列表</span>
    </div>
    <div class=content>
      <div class="panel">
        <div class="head">
          <div class="search-bar">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="searchForm.keyword" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="opr-btns">
            <el-button type="primary" icon="el-icon-plus" @click="add">新增控件</el-button>
            <el-button @click="multSelectionOpr(1)">启用</el-button>
            <el-button @click="multSelectionOpr(2)">停用</el-button>
            <el-button @click="multSelectionOpr(3)">删除</el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table
            v-loading="loadingStatus"
            ref="listTable"
            :data="tableData"
            height="100%"
            tooltip-effect="dark">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="控件名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="controlName"
              label="控件库类型"
              width="120">
            </el-table-column>
            <el-table-column
              label="状态"
              width="80">
              <template slot-scope="scope"><span :style="{color: scope.row.flag === 0 ? 'red' : 'green'}">{{ scope.row.flag === 0 ? '停用' : '启用' }}</span></template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="200">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="控件描述"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="editList(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deleteList([scope.row])" type="text" size="small">删除</el-button>
                <el-button @click="linkToEditor(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="changeStatus([scope.row.id], scope.row.flag === 0 ? '1' : '0')" type="text" size="small"><span :style="{color: scope.row.flag === 0 ? 'green' : 'red'}">{{ scope.row.flag === 0 ? '启用' : '停用' }}</span></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog class="opr-panel" :title="formType === 1 ? '新建控件' : '编辑控件'" @close="closeModal" :visible.sync="dialogFormVisible" width="450px">
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="是否开通" :label-width="formLabelWidth" prop="flag" v-if="formType === 2">
          <el-radio-group v-model="form.flag">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type" v-if="formType === 2">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getControlList, addControlItem, delControlItem, changeControlStatus, getControlDetail, getAllLib } from '@/api/controlManage'
const globalConfig = window.GlobalConfig || {}
export default {
  name: 'control-detail',
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      loadingStatus: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      formType: 1,
      curRow: null,
      form: {
        flag: '',
        name: '',
        type: '',
        desc: ''
      },
      formLabelWidth: '80px',
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      },
      typeOptions: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let params = {
        name: this.searchForm.keyword,
        controlId: this.$parent.row.id
      }
      this.loadingStatus = true
      getControlList(params, { pageNo: this.currentPage, pageSize: this.pageSize }).then((res) => {
        this.loadingStatus = false
        if (res.code === 200) {
          if (res.obj) {
            res.obj.total && (this.total = res.obj.total)
            res.obj.list && (this.tableData = res.obj.list)
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        this.loadingStatus = false
        console.log(err)
      })
    },
    add () {
      this.form.name = ''
      this.form.desc = ''
      this.formType = 1
      this.dialogFormVisible = true
    },
    onSearch () {
      this.getList()
    },
    onSubmit () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          let params = {
            controlId: this.$parent.row.id,
            name: this.form.name,
            remark: this.form.desc
          }
          if (this.formType === 2) {
            params.flag = this.form.flag
            params.id = this.curRow.id
            this.form.type && (params.controlId = this.form.type)
          }
          addControlItem(params).then((res) => {
            if (res.code === 200) {
              this.getList()
              this.dialogFormVisible = false
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    getAllLib () {
      this.typeOptions = []
      getAllLib({}).then((res) => {
        console.log(res)
        if (res.code === 200) {
          if (res.obj && res.obj.length > 0) {
            this.$nextTick(() => {
              this.typeOptions = res.obj
            })
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    editList (row) {
      // this.formType = 2
      // this.dialogFormVisible = true
      // this.form.name = '123456' // todo

      this.curRow = row
      // 请求控件库列表
      this.getAllLib()
      // 请求详情信息
      getControlDetail(row.id).then((res) => {
        if (res.code === 200) {
          this.formType = 2
          this.dialogFormVisible = true
          if (res.obj) {
            // 回显
            this.form.name = res.obj.name
            this.form.flag = res.obj.flag + ''
            this.form.desc = res.obj.remark
            this.$nextTick(() => {
              this.form.type = res.obj.controlId
            })
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteList (rowsArr) {
      let names = []
      let ids = []
      rowsArr.forEach((item, index) => {
        if (rowsArr.length > 1) {
          names.push(item.name)
        }
        ids.push(item.id)
      })
      this.$confirm('是否删除' + (names.length <= 1 ? '此条' : names.join(',')) + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delControlItem({ ids: ids.join(',') }).then((res) => {
          if (res.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    changeStatus (ids, type) {
      let params = {
        ids: ids.join(','),
        flag: type
      }
      changeControlStatus(params).then((res) => {
        if (res.code === 200) {
          this.getList()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    linkToEditor (row) {
      let url = globalConfig.webUrl + '/view/control.html?id=' + row.id + '&name=' + row.name
      window.open(url, '_blank')
    },
    multSelectionOpr (type) {
      var selection = this.$refs.listTable.selection
      if (!selection || selection.length <= 0) {
        this.$message({
          message: '请选中一行进行操作',
          type: 'warning'
        })
        return
      }
      if (type === 3) {
        this.deleteList(selection)
      } else {
        let ids = []
        selection.forEach((item) => {
          ids.push(item.id)
        })
        this.changeStatus(ids, type)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    backUpLevel () {
      this.$parent.comName = 'controlMain'
    },
    closeModal () {
      // 重置表单数据
      this.$refs.addForm.resetFields()
      this.$refs.addForm.clearValidate()
    }
  }
}
</script>

<style lang="less" scoped>
  .lib-container {
    .top {
      i {
        cursor: pointer;
      }
    }
  }
</style>
