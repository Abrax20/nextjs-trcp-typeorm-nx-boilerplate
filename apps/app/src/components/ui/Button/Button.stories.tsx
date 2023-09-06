import type { Meta } from '@storybook/react';

import Button from './Button';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'MyButton',
};
export default Story;

export const Primary = {
  args: {
    text: 'Click me!',
    padding: 10,
    disabled: true,
  },
};
