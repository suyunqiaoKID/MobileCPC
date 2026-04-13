export interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  testCases: TestCase[]
  createdAt: Date
  updatedAt: Date
}

export interface TestCase {
  input: string
  expectedOutput: string
  isHidden?: boolean
}

export interface CreateProblemInput {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  testCases: TestCase[]
}

export interface UpdateProblemInput extends Partial<CreateProblemInput> {}
