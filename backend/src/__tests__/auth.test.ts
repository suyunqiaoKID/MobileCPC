import request from 'supertest'
import app from '../index'

describe('认证接口', () => {
  describe('POST /api/auth/register', () => {
    it('应该成功注册用户', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.user).toHaveProperty('id')
      expect(response.body.data.user.email).toBe('test@example.com')
      expect(response.body.data).toHaveProperty('token')
    })

    it('应该拒绝重复注册', async () => {
      // 先注册一次
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'test2@example.com',
          password: 'password123',
        })

      // 尝试用相同邮箱注册
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser3',
          email: 'test2@example.com',
          password: 'password123',
        })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // 注册一个测试用户
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'loginuser',
          email: 'login@example.com',
          password: 'password123',
        })
    })

    it('应该成功登录', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe('login@example.com')
      expect(response.body.data).toHaveProperty('token')
    })

    it('应该拒绝错误密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword',
        })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })
})
