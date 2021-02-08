import request from './request'

/**
 * @method 获取模板库列表（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function getLibList (params1, params2) {
  return request({
    url: '/template/queryByPage?pageNo=' + params2.pageNo + '&pageSize=' + params2.pageSize,
    method: 'post',
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // },
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params: params1
  })
}

/**
 * @method 新增模板库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function addLibItem (params) {
  return request({
    url: '/template',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params
  })
}

/**
 * @method 删除模板库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function delLibItem (id) {
  return request({
    url: '/template/delete/' + id,
    method: 'delete'
  })
}

/**
 * @method 启用停用模板库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function changeLibStatus (params) {
  return request({
    url: '/template/updateFlag?ids=' + params.ids + '&flag=' + params.flag,
    method: 'post'
  })
}

/**
 * @method 获取模板库详情信息（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function getLibDetail (id) {
  return request({
    url: '/template/get/' + id,
    method: 'get'
  })
}

/**
 * @method 获取模板列表（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function getTempList (params1, params2) {
  return request({
    url: '/template-attribute/queryByPage?pageNo=' + params2.pageNo + '&pageSize=' + params2.pageSize,
    method: 'post',
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // },
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params: params1
  })
}

/**
 * @method 新增模板（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function addTempItem (params) {
  return request({
    url: '/template-attribute',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params
  })
}

/**
 * @method 删除模板（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function delTempItem (params) {
  return request({
    url: '/template-attribute/delete',
    method: 'delete',
    params
  })
}

/**
 * @method 启用停用模板库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function changeTempStatus (params) {
  return request({
    url: '/template-attribute/updateFlag?ids=' + params.ids + '&flag=' + params.flag,
    method: 'post'
  })
}

/**
 * @method 获取模板详情信息（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function getTempDetail (id) {
  return request({
    url: '/template-attribute/get/' + id,
    method: 'get'
  })
}

/**
 * @method 获取模板库列表所有数据（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/6
*/
export function getAllLib (params) {
  return request({
    url: '/template/getAllList',
    method: 'get',
    params
  })
}

/**
 * @method 表格demo添加数据（后端-张俊培）
 * @param {}
 * @return
 * @date 2019/5/24
 */
export function addList (params) {
  return request({
    url: '/api/values',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    method: 'post',
    params
  }, false)
}
