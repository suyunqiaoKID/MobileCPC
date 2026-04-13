import { Request, Response, NextFunction } from 'express'
import { prisma } from '../index'
import { hashPassword, verifyPassword, generateToken } from '../utils/auth'
import { successResponse, errorResponse } from '../utils/response'
import { RegisterInput, LoginInput, UserResponse } from '../types/auth'

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body

    // 检查用户是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      return errorResponse(res, '用户名或邮箱已存在')
    }

    // 创建用户
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    // 创建用户进度记录
    await prisma.userProgress.create({
      data: {
        userId: user.id,
      },
    })

    // 生成token
    const token = generateToken(user.id)

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }

    successResponse(res, { user: userResponse, token }, '注册成功')
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return errorResponse(res, '邮箱或密码错误')
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return errorResponse(res, '邮箱或密码错误')
    }

    // 生成token
    const token = generateToken(user.id)

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }

    successResponse(res, { user: userResponse, token }, '登录成功')
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId
    if (!userId) {
      return errorResponse(res, '未认证', 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    })

    if (!user) {
      return errorResponse(res, '用户不存在')
    }

    successResponse(res, { user }, '获取成功')
  } catch (error) {
    next(error)
  }
}
