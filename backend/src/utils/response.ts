import { Response } from 'express'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export const successResponse = <T>(
  res: Response,
  data?: T,
  message: string = '操作成功'
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  }
  res.json(response)
}

export const errorResponse = (
  res: Response,
  error: string = '操作失败',
  statusCode: number = 400
) => {
  const response: ApiResponse = {
    success: false,
    error,
  }
  res.status(statusCode).json(response)
}

export const validationError = (
  res: Response,
  errors: Record<string, string[]>
) => {
  const response: ApiResponse = {
    success: false,
    error: '验证失败',
    data: errors,
  }
  res.status(422).json(response)
}
