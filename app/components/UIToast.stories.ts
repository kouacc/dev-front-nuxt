import UIToast from './UIToast.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Toast',
  component: UIToast,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    variant: { control: 'select', options: ['solid', 'outline'] },
    type: { control: 'select', options: ['default', 'success', 'info', 'warning', 'error'] },
  },
  args: {
    id: 'toast',
    title: 'Toast Title',
    message: 'This is a toast message.',
    variant: 'solid',
    type: 'default',
    actionLeft: { label: 'Button', callback: () => {}, priority: 'primary' },
    actionRight: { label: 'Button', callback: () => {}, priority: 'secondary' },
  },
} satisfies Meta<typeof UIToast>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultSolid: Story = {
  args: {
    id: 'default-solid',
    type: 'default',
    variant: 'solid',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const SuccessSolid: Story = {
  args: {
    id: 'success-solid',
    type: 'success',
    variant: 'solid',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const InfoSolid: Story = {
  args: {
    id: 'info-solid',
    type: 'info',
    variant: 'solid',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const WarningSolid: Story = {
  args: {
    id: 'warning-solid',
    type: 'warning',
    variant: 'solid',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const ErrorSolid: Story = {
  args: {
    id: 'error-solid',
    type: 'error',
    variant: 'solid',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const DefaultOutline: Story = {
  args: {
    id: 'default-outline',
    type: 'default',
    variant: 'outline',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const SuccessOutline: Story = {
  args: {
    id: 'success-outline',
    type: 'success',
    variant: 'outline',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const InfoOutline: Story = {
  args: {
    id: 'info-outline',
    type: 'info',
    variant: 'outline',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const WarningOutline: Story = {
  args: {
    id: 'warning-outline',
    type: 'warning',
    variant: 'outline',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}

export const ErrorOutline: Story = {
  args: {
    id: 'error-outline',
    type: 'error',
    variant: 'outline',
    title: 'Toast Title',
    message: 'This is a toast message.',
  },
}
