import { MantineProvider } from '@mantine/core';

import { AppContainer } from './AppContainer';

type PropsType = {
  children: React.ReactNode;
};
export function AppWrapper({ children }: PropsType) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
      }}
    >
      <AppContainer>{children}</AppContainer>
    </MantineProvider>
  );
}
