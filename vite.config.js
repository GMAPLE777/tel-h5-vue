import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// ==================== Mock 数据 ====================
const packageList = [
  { id: 1, name: '5G畅享套餐A', tag: '热卖', desc: '30GB高速流量 + 200分钟国内通话', price: 39, features: ['5G网络', '30GB流量', '200分钟'], thumbnail: '/images/banner-1.svg', category: '5g' },
  { id: 2, name: '5G畅享套餐B', tag: '推荐', desc: '60GB流量 + 500分钟通话 + 视频会员', price: 59, features: ['5G网络', '60GB流量', '500分钟', '含视频会员'], thumbnail: '/images/banner-1.svg', category: '5g' },
  { id: 3, name: '家庭融合套餐', tag: '', desc: '100GB共享流量 + 1000分钟通话 + 300M宽带', price: 99, features: ['3张副卡', '100GB共享', '1000分钟', '宽带300M'], thumbnail: '/images/banner-2.svg', category: 'family' },
  { id: 4, name: '流量畅享套餐', tag: '新品', desc: '100GB超大流量不限速，免流APP全覆盖', price: 49, features: ['100GB流量', '不限速', '免流APP'], thumbnail: '/images/banner-3.svg', category: 'data' },
  { id: 5, name: '青春校园卡', tag: '', desc: '20GB流量 + 100分钟通话，校园专属权益', price: 19, features: ['20GB流量', '100分钟', '校园权益'], thumbnail: '/images/banner-1.svg', category: 'youth' },
  { id: 6, name: '5G尊享套餐', tag: '旗舰', desc: '200GB流量 + 2000分钟通话 + 1000M宽带', price: 199, features: ['5G极速', '200GB流量', '2000分钟', '宽带1000M', '含视频会员'], thumbnail: '/images/banner-1.svg', category: '5g' },
]

const packageDetailMap = {
  1: { id: 1, name: '5G畅享套餐A', tag: '热卖', desc: '30GB高速流量 + 200分钟国内通话，畅享5G极速网络，支持多终端共享', benefits: [{ icon: '/icons/benefit-data.svg', label: '通用流量', value: '30GB/月' }, { icon: '/icons/benefit-call.svg', label: '语音通话', value: '200分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '5G网络', value: '极速上网' }, { icon: '/icons/benefit-video.svg', label: '视频会员', value: '赠送3个月' }], feeDetail: [{ item: '月基本费', content: '39元/月' }, { item: '套外流量', content: '5元/GB' }, { item: '套外通话', content: '0.15元/分钟' }, { item: '国内短信', content: '0.1元/条' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '12个月' }], specs: [{ id: 1, name: '基础版', price: 39, features: ['30GB流量', '200分钟通话', '5G上网'] }, { id: 2, name: '畅享版', price: 59, features: ['60GB流量', '500分钟通话', '5G上网', '含视频会员'] }, { id: 3, name: '尊享版', price: 99, features: ['100GB流量', '1000分钟通话', '5G极速', '含视频会员', '宽带300M'] }] },
  2: { id: 2, name: '5G畅享套餐B', tag: '推荐', desc: '60GB高速流量 + 500分钟国内通话，含热门视频会员，超值之选', benefits: [{ icon: '/icons/benefit-data.svg', label: '通用流量', value: '60GB/月' }, { icon: '/icons/benefit-call.svg', label: '语音通话', value: '500分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '5G网络', value: '极速上网' }, { icon: '/icons/benefit-video.svg', label: '视频会员', value: '赠送6个月' }], feeDetail: [{ item: '月基本费', content: '59元/月' }, { item: '套外流量', content: '3元/GB' }, { item: '套外通话', content: '0.1元/分钟' }, { item: '国内短信', content: '0.1元/条' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '12个月' }], specs: [{ id: 1, name: '基础版', price: 59, features: ['60GB流量', '500分钟通话', '5G上网'] }, { id: 2, name: '升级版', price: 79, features: ['80GB流量', '800分钟通话', '5G上网', '含视频会员'] }] },
  3: { id: 3, name: '家庭融合套餐', tag: '', desc: '一人付费全家共享，100GB超大流量 + 1000分钟通话 + 300M光纤宽带', benefits: [{ icon: '/icons/benefit-data.svg', label: '共享流量', value: '100GB/月' }, { icon: '/icons/benefit-call.svg', label: '共享通话', value: '1000分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '副卡数量', value: '最多3张' }, { icon: '/icons/benefit-video.svg', label: '光纤宽带', value: '300Mbps' }], feeDetail: [{ item: '月基本费', content: '99元/月' }, { item: '套外流量', content: '3元/GB' }, { item: '套外通话', content: '0.1元/分钟' }, { item: '副卡月费', content: '10元/张/月' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '24个月' }], specs: [{ id: 1, name: '标准版', price: 99, features: ['100GB共享', '1000分钟', '宽带300M', '1张副卡'] }, { id: 2, name: '豪华版', price: 129, features: ['150GB共享', '2000分钟', '宽带500M', '3张副卡'] }] },
  4: { id: 4, name: '流量畅享套餐', tag: '新品', desc: '100GB超大流量，不限速不降速，主流APP免流，追剧游戏无压力', benefits: [{ icon: '/icons/benefit-data.svg', label: '通用流量', value: '100GB/月' }, { icon: '/icons/benefit-call.svg', label: '语音通话', value: '100分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '免流APP', value: '30+款' }, { icon: '/icons/benefit-video.svg', label: '流量结转', value: '支持' }], feeDetail: [{ item: '月基本费', content: '49元/月' }, { item: '套外流量', content: '5元/GB' }, { item: '套外通话', content: '0.15元/分钟' }, { item: '国内短信', content: '0.1元/条' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '6个月' }], specs: [{ id: 1, name: '基础版', price: 49, features: ['100GB流量', '100分钟通话', '免流APP'] }, { id: 2, name: '增强版', price: 69, features: ['150GB流量', '300分钟通话', '免流APP', '可结转'] }] },
  5: { id: 5, name: '青春校园卡', tag: '', desc: '专为在校大学生设计，超低月租，学习娱乐两不误', benefits: [{ icon: '/icons/benefit-data.svg', label: '通用流量', value: '20GB/月' }, { icon: '/icons/benefit-call.svg', label: '语音通话', value: '100分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '校园权益', value: '图书馆/食堂' }, { icon: '/icons/benefit-video.svg', label: '定向免流', value: '学习APP' }], feeDetail: [{ item: '月基本费', content: '19元/月' }, { item: '套外流量', content: '5元/GB' }, { item: '套外通话', content: '0.15元/分钟' }, { item: '校园流量', content: '赠送10GB' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '无' }], specs: [{ id: 1, name: '标准版', price: 19, features: ['20GB流量', '100分钟通话', '校园权益'] }] },
  6: { id: 6, name: '5G尊享套餐', tag: '旗舰', desc: '顶级配置，200GB流量 + 2000分钟通话 + 1000M光纤宽带，尊贵体验', benefits: [{ icon: '/icons/benefit-data.svg', label: '通用流量', value: '200GB/月' }, { icon: '/icons/benefit-call.svg', label: '语音通话', value: '2000分钟/月' }, { icon: '/icons/benefit-5g.svg', label: '5G网络', value: '极速不限速' }, { icon: '/icons/benefit-video.svg', label: '全家权益', value: '视频/音乐/阅读' }], feeDetail: [{ item: '月基本费', content: '199元/月' }, { item: '套外流量', content: '1元/GB' }, { item: '套外通话', content: '0.1元/分钟' }, { item: '国内短信', content: '免费' }, { item: '来电显示', content: '免费' }, { item: '合约期', content: '24个月' }], specs: [{ id: 1, name: '标准版', price: 199, features: ['200GB流量', '2000分钟通话', '宽带1000M', '3张副卡'] }, { id: 2, name: '铂金版', price: 299, features: ['300GB流量', '3000分钟通话', '宽带2000M', '5张副卡', '专线服务'] }] },
}

const bookings = []

// ==================== Mock 处理器 ====================
function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms))
}

async function handleMockRequest(method, url, query, body) {
  await delay(method === 'POST' ? 500 : 300)

  // GET /api/package/list
  if (method === 'GET' && url === '/api/package/list') {
    let list = [...packageList]
    if (query.category && query.category !== 'all') {
      list = list.filter((p) => p.category === query.category)
    }
    return { code: 0, data: { list, total: list.length }, message: 'ok' }
  }

  // GET /api/package/detail
  if (method === 'GET' && url === '/api/package/detail') {
    const detail = packageDetailMap[Number(query.id)]
    if (!detail) return { code: 404, data: null, message: '套餐不存在' }
    return { code: 0, data: detail, message: 'ok' }
  }

  // POST /api/booking
  if (method === 'POST' && url === '/api/booking') {
    if (!body.name || !body.name.trim()) return { code: 400, data: null, message: '姓名不能为空' }
    if (!body.phone || !/^1[3-9]\d{9}$/.test(body.phone)) return { code: 400, data: null, message: '手机号格式不正确' }
    const record = { id: bookings.length + 1, ...body, createdAt: new Date().toISOString() }
    bookings.push(record)
    return { code: 0, data: { id: record.id }, message: '预约成功' }
  }

  return { code: 404, data: null, message: `接口未定义: ${method} ${url}` }
}

// ==================== Vite 插件 ====================
function mockPlugin() {
  return {
    name: 'vite-plugin-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next()

        const urlObj = new URL(req.url, 'http://localhost')
        const query = Object.fromEntries(urlObj.searchParams.entries())

        let body = {}
        if (req.method.toUpperCase() === 'POST') {
          try {
            const chunks = []
            for await (const chunk of req) chunks.push(chunk)
            const raw = Buffer.concat(chunks).toString()
            body = raw ? JSON.parse(raw) : {}
          } catch { body = {} }
        }

        const result = await handleMockRequest(
          req.method.toUpperCase(),
          urlObj.pathname,
          query,
          body,
        )

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = result.code >= 400 ? result.code : 200
        res.end(JSON.stringify(result))
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), mockPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
