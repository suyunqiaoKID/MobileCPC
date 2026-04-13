import { Request, Response, NextFunction } from 'express'
import { prisma } from '../index'
import { successResponse, errorResponse } from '../utils/response'
import { CreateProblemInput, UpdateProblemInput } from '../types/problem'

export const getProblems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = '1', limit = '20', difficulty, tag } = req.query

    const pageNum = parseInt(page as string) || 1
    const limitNum = parseInt(limit as string) || 20
    const skip = (pageNum - 1) * limitNum

    const where: any = {}
    if (difficulty) where.difficulty = difficulty
    if (tag) where.tags = { has: tag as string }

    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          difficulty: true,
          tags: true,
          createdAt: true,
        },
      }),
      prisma.problem.count({ where }),
    ])

    successResponse(res, {
      problems,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getProblem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const problem = await prisma.problem.findUnique({
      where: { id },
    })

    if (!problem) {
      return errorResponse(res, '题目不存在', 404)
    }

    // 隐藏测试用例的预期输出
    const testCases = problem.testCases.map((testCase: any) => ({
      ...testCase,
      expectedOutput: testCase.isHidden ? undefined : testCase.expectedOutput,
    }))

    successResponse(res, {
      ...problem,
      testCases,
    })
  } catch (error) {
    next(error)
  }
}

export const createProblem = async (
  req: Request<{}, {}, CreateProblemInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const problem = await prisma.problem.create({
      data: req.body,
    })

    successResponse(res, problem, '题目创建成功', 201)
  } catch (error) {
    next(error)
  }
}

export const updateProblem = async (
  req: Request<{ id: string }, {}, UpdateProblemInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const problem = await prisma.problem.update({
      where: { id },
      data: req.body,
    })

    successResponse(res, problem, '题目更新成功')
  } catch (error) {
    next(error)
  }
}

export const deleteProblem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await prisma.problem.delete({
      where: { id },
    })

    successResponse(res, null, '题目删除成功')
  } catch (error) {
    next(error)
  }
}
