/**
 * 验证手机号格式
 * @param {string} phone - 手机号码
 * @returns {boolean}
 */
export function validatePhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证是否为空
 * @param {string} value - 输入值
 * @returns {boolean} 为空返回 true
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true
  return String(value).trim() === ''
}
