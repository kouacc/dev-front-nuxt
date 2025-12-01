const API_BASE_URL = process.env.API_BASE_URL

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  is_admin: boolean
}

export const useAuth = () => {
  const getUser = async () => {
    return await $fetch('/users/session', {
      baseURL: API_BASE_URL
    })
    
  }

  const register = async (payload: RegisterPayload) => {
    return await $fetch('/users/register', {
      baseURL: API_BASE_URL,
      method: 'POST',
      body: payload
    })
  } 

  const login = async (payload: LoginPayload) => {
    await $fetch('/users/login', {
      baseURL: API_BASE_URL,
      method: 'POST',
      body: payload
    })
  }

  const logout = async () => {
    await $fetch('/users/logout', {
      baseURL: API_BASE_URL
    })
    return true
  }

  return {
    getUser,
    register,
    login,
    logout
  }
}