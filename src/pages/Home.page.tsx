import { CatActions, ColorSchemeToggle, Welcome } from '~components';
import { Box, Stack } from '@mantine/core';

export function HomePage() {
  return (
    <Box>
      <ColorSchemeToggle />
      <Stack gap="xl">
        <Welcome />
        <CatActions />
      </Stack>
    </Box>
  );
}
