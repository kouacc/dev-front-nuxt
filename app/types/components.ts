import type { RouterLinkProps } from 'vue-router'

export interface UIBreadcrumbItem {
  text: string
  href?: RouterLinkProps['to']
  icon?: string
  disabled?: boolean
}

export interface ToastAction {
  label: string
  priority: 'primary' | 'secondary'
  callback: () => void
}

export interface UIToastProps {
  id: string
  title: string
  message: string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
  variant?: 'solid' | 'outline'
  icon?: string
  actionLeft?: ToastAction
  actionRight?: ToastAction
  duration?: number
}