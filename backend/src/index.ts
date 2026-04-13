import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { errorHandler } from './middleware/errorHandler'

// 加载环境变量
dotenv.config()

// 初始化Express应用
const app = express()
const PORT = process.env.PORT || 3001

// 初始化Prisma客户端
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// 中间件
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 健康检查
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MobileCPC API',
    version: '1.0.0',
  })
})

// API路由
import authRoutes from './routes/authRoutes'
import problemRoutes from './routes/problemRoutes'

app.use('/api/auth', authRoutes)
app.use('/api/problems', problemRoutes)

// API文档
app.get('/api', (_req, res) => {
  res.json({
    name: 'MobileCPC API',
    version: '1.0.0',
    description: '手机端XCPC思维训练平台API',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
      },
      problems: {
        list: 'GET /api/problems',
        detail: 'GET /api/problems/:id',
        create: 'POST /api/problems',
        update: 'PUT /api/problems/:id',
        delete: 'DELETE /api/problems/:id',
      },
    },
  })
})

// 404处理
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在',
  })
})

// 错误处理
app.use(errorHandler)

// 启动服务器
const startServer = async () => {
  try {
    // 测试数据库连接
    await prisma.$connect()
    console.log('✅ 数据库连接成功')

    app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`)
      console.log(`📊 健康检查: http://localhost:${PORT}/health`)
      console.log(`📚 API文档: http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('❌ 启动失败:', error)
    process.exit(1)
  }
}

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('🛑 收到关闭信号，正在关闭服务器...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🛑 收到中断信号，正在关闭服务器...')
  await prisma.$disconnect()
  process.exit(0)
})

// 启动服务器
startServer()

export default app
