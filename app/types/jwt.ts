export interface JWTPayload {
  iss: number
  exp: number
  email: string
  user_id: number
  username: string
  is_admin: 1 | 0
}