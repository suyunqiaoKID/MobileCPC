import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/auth'
import { errorResponse } from '../utils/response'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, '未提供认证令牌', 401)
  }

  const token = authHeader.substring(7)
  const decoded = verifyToken(token)

  if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
    return errorResponse(res, '无效的认证令牌', 401)
  }

  req.userId = decoded.userId
  next()
}
