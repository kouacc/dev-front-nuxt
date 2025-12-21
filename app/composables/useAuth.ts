import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '~/types/jwt'

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

type LoginResponse = {
  success: boolean
  message: string
  data: {
    user: {
      user_id: number
      username: string
      email: string
      first_name: string
      last_name: string
      is_admin: 0 | 1
      created_at: string
      updated_at: string
    }
    token: string
  }
}

export const useAuth = () => {
  const apiUrl = useRuntimeConfig().public.apiUrl
  const toast = useToast()

  const getUser = (): JWTPayload | null => {
    const token = useCookie('user-token').value
    if (!token) {
      return null
    }
    const decoded = jwtDecode<JWTPayload>(token)
    return decoded
  }

  const register = async (payload: RegisterPayload) => {
    return await $fetch('/users/register', {
      baseURL: apiUrl,
      method: 'POST',
      body: payload
    })
  } 

  const login = async (payload: LoginPayload) => {
    const user = await $fetch<LoginResponse>('/users/login', {
      baseURL: apiUrl,
      method: 'POST',
      body: payload,
      onResponse: ({ response }) => {
        if (response.status !== 200) {
          toast.addToast({
            title: 'Echec de la connexion',
            message: 'Veuillez vérifier vos identifiants et réessayer.',
            type: 'error',
            icon: 'lucide:alert-circle',
            duration: 5000
          })
        }
      }
    })
    useCookie('user-token').value = user.data.token
    return user
  }

  const logout = async () => {
    useCookie('user-token').value = ''
    navigateTo('/login')
    return
  }

  return {
    getUser,
    register,
    login,
    logout
  }
}