import { Meta, StoryObj } from '@storybook/react';

import CalendarChildrenForm from './Calendar-ChildrenForm.tsx';

type Story = StoryObj<typeof CalendarChildrenForm>;

const meta: Meta<typeof CalendarChildrenForm> = {
  title: 'Calendar/ChildrenForm',
  component: CalendarChildrenForm,
  tags: ['autodocs']
};

export default meta;

export const MainNav: Story = {
  args: {
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      console.log(e.target.value);
    }
  }
};
