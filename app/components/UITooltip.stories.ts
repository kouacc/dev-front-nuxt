import UIButton from '@/components/UIButton.vue'
import UITooltip from '@/components/UITooltip.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Tooltip',
  component: UITooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    orientation: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  args: {
    content: 'Tooltip',
    orientation: 'bottom',
  },
  render: (args) => ({
    components: { UIButton, UITooltip },
    setup() {
      return { args }
    },
    template: `
    <UITooltip v-bind="args">
      <UIButton>
        Tooltip
      </UIButton>
    </UITooltip>`,
  }),
} satisfies Meta<typeof UITooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Bottom: Story = {
  args: {
    orientation: 'bottom',
  },
}

export const Top: Story = {
  args: {
    orientation: 'top',
  },
}

export const Left: Story = {
  args: {
    orientation: 'left',
  },
}

export const Right: Story = {
  args: {
    orientation: 'right',
  },
}
