import request from './request'

/**
 * @method 表格demo获取列表数据（后端-张俊培）
 * @param {}
 * @return
 * @date 2019/5/24
*/
export function getList (params) {
  return request({
    url: '/api/values',
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

/**
 * @method 表格demo修改列表数据（后端-张俊培）
 * @param {}
 * @return
 * @date 2019/5/24
 */
export function editList (params) {
  return request({
    url: '/channelApi/getObjectId',
    method: 'post',
    params
  })
}

/**
 * @method 表格demo删除列表数据（后端-张俊培）
 * @param {}
 * @return
 * @date 2019/5/24
 */
export function delList (params) {
  return request({
    url: '/api/values',
    method: 'delete',
    params
  })
}
