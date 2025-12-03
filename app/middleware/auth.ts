import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '~/types/jwt'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('user-token').value
  if (!token || token.length === 0) {
    return navigateTo('/login')
  }

  const decoded = jwtDecode<JWTPayload>(token)

  const currentTime = Math.floor(Date.now() / 1000)
  if (decoded.exp < currentTime) {
    useCookie('user-token').value = ''
    return navigateTo('/login')
  }

  return
})