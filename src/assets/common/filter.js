/**
 * @Description 自定义过滤器，全局加入
 * @author 徐尚华
 * @date 2019/4/17
 */

/**
 * @method 如果值为null，undefined或者为空，则显示'--'
 * @param val
 * @return
 * @date 2019/4/17
 */
const judgeInvalid = (val) => {
  if (!val && val !== 0) {
    return '--'
  }
  return val
}

/**
 * @method 过滤数字，保留两位小数
 * @param val
 * @return
 * @date 2019/4/17
 */
const twoDecimal = (val) => {
  if (val === '--') {
    return val
  }
  return val.toFixed(2)
}

/**
 * @method 金额相关，每三位添加逗号
 * @param val
 * @return
 * @date 2019/4/17
 */
const toThousands = (val) => {
  if (val === '--') {
    return val
  }
  let num = (val || 0) + ''
  let dec = ''
  if (num.indexOf('.') >= 0) {
    dec = num.split('.')[1]
    num = num.split('.')[0]
  }
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  return result + (dec ? '.' + dec : '')
}

export {
  judgeInvalid,
  twoDecimal,
  toThousands
}
