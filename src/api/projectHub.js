import request from './request'

/**
 * @method 项目仓库-创建项目（后端-温昌平）
 * @param {
    "code": "项目编号",
    "projectName": "项目名称",
    "remark": "项目描述"
  }
 * @return
 * @date 2019/11/5
 */
export function projectStore (params) {
  return request({
    url: '/projectStore',
    method: 'post',
    data: params
  })
}

/**
 * @method 项目仓库-项目列表（后端-温昌平）
 * @param {}
 * @query pageNo=1&pageSize=10
 * @return
 * @date 2019/11/5
 */
export function queryByPage (path, data) {
  return request({
    url: '/projectStore/queryByPage' + path,
    method: 'post',
    data
  })
}

/**
 * @method 项目仓库-项目列表-删除项目（后端-温昌平）
 * @param {}
 * @return
 * @date 2019/11/5
 */
export function deleteById (path) {
  return request({
    url: '/projectStore/deleteById/' + path,
    method: 'DELETE'
  })
}

/**
 * @method 项目仓库-项目列表-修改项目（后端-温昌平）
 * @param {
      "code": "项目编号",
      "id": "主键",
      "projectName": "项目名称",
      "publish": "发布状态 0否,1是",
      "remark": "项目描述"
    }
 * @return
 * @date 2019/11/5
 */
export function updateById (params) {
  return request({
    url: '/projectStore/updateById',
    method: 'PUT',
    paramsType: 'json',
    data: params
  })
}

/**
 * @method 项目仓库-项目列表-克隆项目（后端-温昌平）
 * @param {}
 * @return
 * @date 2019/11/5
 */
export function clone (path) {
  return request({
    url: '/projectStore/clone/' + path,
    method: 'GET'
  })
}

/**
 * @method 项目仓库-项目列表-项目发布/取消发布（后端-温昌平）
 * @param {}
 * @query id=1&publishState=0 发布状态,0取消发布,1发布
 * @return
 * @date 2019/11/5
 */
export function publishById (path) {
  return request({
    url: '/projectStore/publishById' + path,
    method: 'GET'
  })
}

/**
 * @method 项目仓库-创建项目（后端-温昌平）
 * @param {"ids":[1,2]}
 * @return
 * @date 2019/11/6
 */
export function batchDeleteById (params) {
  return request({
    url: '/projectStore/batchDeleteById',
    method: 'post',
    data: params
  })
}
