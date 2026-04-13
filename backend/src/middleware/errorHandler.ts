import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/response'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message)
  console.error('Stack:', err.stack)

  // 处理已知错误类型
  if (err.name === 'ValidationError') {
    return errorResponse(res, '数据验证失败', 400)
  }

  if (err.name === 'UnauthorizedError') {
    return errorResponse(res, '未授权访问', 401)
  }

  // 默认错误处理
  return errorResponse(
    res,
    process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message,
    500
  )
}
