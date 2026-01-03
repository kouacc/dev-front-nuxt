import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '~/types/jwt'

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('user-token').value
  if (!token || token.length === 0) {
    if (to.path === '/login' || to.path === '/signup') {
      return
    }
    return navigateTo('/login')
  }
  
  const decoded = jwtDecode<JWTPayload>(token)

  if (decoded.is_admin !== 1) {
    return navigateTo('/dashboard')
  }

  const currentTime = Math.floor(Date.now() / 1000)
  if (decoded.exp < currentTime) {
    useCookie('user-token').value = ''
    return navigateTo('/login')
  }

  return
})