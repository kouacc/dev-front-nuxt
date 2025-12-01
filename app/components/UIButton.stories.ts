import UIButton from '@/components/UIButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Button',
  component: UIButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['tiny', 'small', 'medium', 'large', 'giant'] },
    variant: { control: 'radio', options: ['default', 'outline', 'ghost'] },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'link'] },
  },
  args: {
    size: 'medium',
    variant: 'default',
  },
  render: (args) => ({
    components: { UIButton },
    setup() {
      return { args }
    },
    template: '<UIButton v-bind="args">Button</UIButton>',
  }),
} satisfies Meta<typeof UIButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}
