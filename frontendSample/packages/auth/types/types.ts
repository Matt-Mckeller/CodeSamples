export interface JwtAuthData {
  iat: string
  exp: string
  user?: {
    id: number
    fullName: string
    active: boolean
    email: string
    phone?: string
    lastLogIn: string
    createdAt: string
    updatedAt: string
    sessions?: any[]
    agreements?: any[]
    role?: any
  }
}
