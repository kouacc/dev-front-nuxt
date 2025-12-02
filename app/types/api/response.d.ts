type APIResponse<T> = {
  success: boolean
  count?: number
  data: T
}