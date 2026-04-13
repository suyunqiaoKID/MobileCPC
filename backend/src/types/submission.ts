export type SubmissionStatus = 
  | 'pending'
  | 'judging'
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'memory_limit_exceeded'
  | 'runtime_error'
  | 'compile_error'

export interface Submission {
  id: string
  userId: string
  problemId: string
  code: string
  language: 'javascript' | 'python' | 'cpp' | 'java'
  status: SubmissionStatus
  result?: {
    passed: number
    total: number
    details: TestResult[]
  }
  time?: number
  memory?: number
  createdAt: Date
}

export interface TestResult {
  testCaseId: number
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput?: string
  error?: string
  time?: number
  memory?: number
}

export interface CreateSubmissionInput {
  problemId: string
  code: string
  language: 'javascript' | 'python' | 'cpp' | 'java'
}
