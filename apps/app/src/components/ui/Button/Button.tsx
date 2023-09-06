import { ButtonProps, Button as MantineButton } from '@mantine/core';
import React from 'react';

const Button: React.FC<ButtonProps> = ({
  children,
  radius = 'md',
  ...props
}: ButtonProps) => {
  console.log({ radius });

  return (
    <MantineButton radius={radius} {...props}>
      {children}
    </MantineButton>
  );
};

export default Button;
