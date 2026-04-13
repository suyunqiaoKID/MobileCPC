import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
