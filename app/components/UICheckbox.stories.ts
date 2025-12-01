import UICheckbox from './UICheckbox.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Checkbox',
  component: UICheckbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    position: { control: 'radio', options: ['left', 'right'] },

  },
  args: {
    disabled: false,
    indeterminate: false,
    label: 'Checkbox label',
    position: 'right',
  },
} satisfies Meta<typeof UICheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Left: Story = {
  args: {
    disabled: false,
    indeterminate: false,
    label: 'Checkbox label',
    position: 'left',
  },
}

export const Right: Story = {
  args: {
    disabled: false,
    indeterminate: false,
    label: 'Checkbox label',
    position: 'right',
  },
}
