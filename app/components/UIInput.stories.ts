import UIInput from '@/components/UIInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Input',
  component: UIInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'] },
    variant: { control: 'radio', options: ['full', 'outline'] },
    color: { control: 'select', options: ['default', 'success', 'info', 'warning', 'error'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    size: 'medium',
    variant: 'full',
    placeholder: 'Placeholder',
    label: 'Input label',
    helperText: 'Helper text',
  },
} satisfies Meta<typeof UIInput>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  args: {
    variant: 'full',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}
