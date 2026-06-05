import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Mock 插件：在开发服务器中拦截 /api/ 请求，返回模拟数据
 */
function mockPlugin() {
  return {
    name: 'vite-plugin-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next()
        }

        // 构造查询参数
        const urlObj = new URL(req.url, 'http://localhost')
        const query = Object.fromEntries(urlObj.searchParams.entries())

        // 读取请求体
        let body = {}
        if (req.method.toUpperCase() === 'POST') {
          try {
            const chunks = []
            for await (const chunk of req) {
              chunks.push(chunk)
            }
            const raw = Buffer.concat(chunks).toString()
            body = raw ? JSON.parse(raw) : {}
          } catch {
            body = {}
          }
        }

        // 动态导入 mock 处理器
        const handlerPath = fileURLToPath(
          new URL('./src/mock/handler.js', import.meta.url)
        )
        // 开发期间每次请求都清除缓存，确保拿到最新 mock 代码
        const mod = await import(`${handlerPath}?t=${Date.now()}`)
        const result = await mod.handleMockRequest(
          req.method,
          urlObj.pathname,
          query,
          body
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
