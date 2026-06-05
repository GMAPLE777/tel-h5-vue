/**
 * Mock 请求处理器
 * 拦截 /api/* 请求，返回模拟数据
 */
import { packageList, packageDetailMap } from './data'

// 模拟网络延迟
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// 预约记录（内存存储，重启后清空）
const bookings = []

/**
 * 处理 GET /api/package/list
 */
async function handlePackageList(params) {
  await delay()
  let list = [...packageList]

  // 支持分类筛选
  if (params.category && params.category !== 'all') {
    list = list.filter((p) => p.category === params.category)
  }

  return {
    code: 0,
    data: {
      list,
      total: list.length,
    },
    message: 'ok',
  }
}

/**
 * 处理 GET /api/package/detail
 */
async function handlePackageDetail(params) {
  await delay()
  const id = Number(params.id)
  const detail = packageDetailMap[id]

  if (!detail) {
    return { code: 404, data: null, message: '套餐不存在' }
  }

  return {
    code: 0,
    data: detail,
    message: 'ok',
  }
}

/**
 * 处理 POST /api/booking
 */
async function handleBooking(body) {
  await delay(500)

  // 模拟服务端校验
  if (!body.name || !body.name.trim()) {
    return { code: 400, data: null, message: '姓名不能为空' }
  }
  if (!body.phone || !/^1[3-9]\d{9}$/.test(body.phone)) {
    return { code: 400, data: null, message: '手机号格式不正确' }
  }

  const record = {
    id: bookings.length + 1,
    name: body.name.trim(),
    phone: body.phone.trim(),
    packageId: body.packageId,
    specId: body.specId,
    remark: body.remark || '',
    createdAt: new Date().toISOString(),
  }
  bookings.push(record)

  return {
    code: 0,
    data: { id: record.id },
    message: '预约成功',
  }
}

/**
 * 路由表
 */
const routes = {
  'GET /api/package/list': (params) => handlePackageList(params),
  'GET /api/package/detail': (params) => handlePackageDetail(params),
  'POST /api/booking': (_, body) => handleBooking(body),
}

/**
 * 处理请求入口
 */
export async function handleMockRequest(method, url, query, body) {
  const key = `${method.toUpperCase()} ${url}`
  const handler = routes[key]

  if (!handler) {
    return { code: 404, data: null, message: `Mock 路由未定义: ${key}` }
  }

  try {
    return await handler(query, body)
  } catch (err) {
    return { code: 500, data: null, message: err.message }
  }
}
