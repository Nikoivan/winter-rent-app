import { Meta, StoryObj } from '@storybook/react';

import CalendarDialog from './Calendar-Dialog.tsx';
import { RecordType } from '../../../lib/redux/slices/calendarSlice/calendar.types.ts';

type Story = StoryObj<typeof CalendarDialog>;

const meta: Meta<typeof CalendarDialog> = {
  title: 'Calendar/ChildrenForm',
  component: CalendarDialog,
  tags: ['autodocs']
};

export default meta;

export const Primary: Story = {
  args: {
    isOpen: true,
    onSubmit(formFields: RecordType) {
      // eslint-disable-next-line
      console.log(formFields);
    },
    onCancel() {
      // eslint-disable-next-line
      console.log('Cancel');
    }
  }
};
