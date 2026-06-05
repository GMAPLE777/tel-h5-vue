import request from '@/utils/request'

/**
 * 获取套餐列表
 */
export function getPackageList(params) {
  return request({
    url: '/package/list',
    method: 'GET',
    params,
  })
}

/**
 * 获取套餐详情
 * @param {number} id - 套餐ID
 */
export function getPackageDetail(id) {
  return request({
    url: '/package/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 提交预约申请
 * @param {Object} data - 预约表单数据
 */
export function submitBooking(data) {
  return request({
    url: '/booking',
    method: 'POST',
    data,
  })
}
