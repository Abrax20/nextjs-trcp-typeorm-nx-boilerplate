import type { Meta } from '@storybook/react';
import Button from './Button';

// STORY

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'DefaultButton',
};

export default Story;

// ARGS

type PrimaryArgs = {
  children: React.ReactNode;
  p: number;
  disabled: boolean;
};

export const Primary = {
  args: {
    children: 'Click me!',
    p: 10,
    disabled: true,
  } as PrimaryArgs,
};
