export interface RegisterInput {
  username: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  username: string
  email: string
  createdAt: Date
}
