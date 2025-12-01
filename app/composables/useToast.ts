import type { UIToastProps } from '@/types/components'

const toasts: Ref<UIToastProps[]> = ref([])

export const useToast = () => {
  const addToast = (toast: Omit<UIToastProps, 'id'>) => {
    const index = toasts.value.length
    const newToast: UIToastProps = {
      id: index.toString(),
      ...toast,
    }

    toasts.value.push(newToast)
    
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(index)
      }, duration)
    }

    return index
  }

  const removeToast = (index: number) => {
    if (index >= 0 && index < toasts.value.length) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (
    title: string,
    message: string,
    options?: Partial<Omit<UIToastProps, 'id' | 'title' | 'message' | 'type'>>,
  ) => {
    return addToast({
      title,
      message,
      type: 'success',
      ...options,
    })
  }

  const error = (
    title: string,
    message: string,
    options?: Partial<Omit<UIToastProps, 'id' | 'title' | 'message' | 'type'>>,
  ) => {
    return addToast({
      title,
      message,
      type: 'error',
      ...options,
    })
  }

  const warning = (
    title: string,
    message: string,
    options?: Partial<Omit<UIToastProps, 'id' | 'title' | 'message' | 'type'>>,
  ) => {
    return addToast({
      title,
      message,
      type: 'warning',
      ...options,
    })
  }

  const info = (
    title: string,
    message: string,
    options?: Partial<Omit<UIToastProps, 'id' | 'title' | 'message' | 'type'>>,
  ) => {
    return addToast({
      title,
      message,
      type: 'info',
      ...options,
    })
  }

  const clearAll = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  }
}
