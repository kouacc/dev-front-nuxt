import UIPagination from './UIPagination.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Pagination',
  component: UIPagination,
  tags: ['autodocs'],
  argTypes: {
    pageAmount: { control: 'number' },
    maxPages: { control: 'number' },
  },
  args: {
    pageAmount: 10,
    maxPages: 4,
  },
} satisfies Meta<typeof UIPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pageAmount: 10,
    maxPages: 4,
  },
}
