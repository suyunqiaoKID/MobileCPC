import { Router } from 'express'
import {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} from '../controllers/problemController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', getProblems)
router.get('/:id', getProblem)
router.post('/', authenticate, createProblem)
router.put('/:id', authenticate, updateProblem)
router.delete('/:id', authenticate, deleteProblem)

export default router
