import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UITitle from './UITitle.vue'

const meta = {
  title: 'Components/Title',
  component: UITitle,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['heading1', 'heading2', 'heading3', 'heading4', 'heading5'],
    },
  },
  args: {
    type: 'heading1',
  },
  render: (args) => ({
    components: { UITitle },
    setup() {
      return { args }
    },
    template: '<UITitle v-bind="args">Heading</UITitle>',
  }),
} satisfies Meta<typeof UITitle>

export default meta
type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    type: 'heading1',
  },
}

export const Heading2: Story = {
  args: {
    type: 'heading2',
  },
}
export const Heading3: Story = {
  args: {
    type: 'heading3',
  },
}
export const Heading4: Story = {
  args: {
    type: 'heading4',
  },
}
export const Heading5: Story = {
  args: {
    type: 'heading5',
  },
}
