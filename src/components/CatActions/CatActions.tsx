import { Button, Group, Stack, Text } from '@mantine/core';
import { Receipt } from '../Receipt/Receipt';
import { useCatActions } from './useCatActions';

export function CatActions() {
  const { handleDownload, handleShare, disabled, receiptRef } = useCatActions();

  return (
    <Stack>
      <Receipt receiptRef={receiptRef} />
      <Group justify="center" align="start">
        <Button
          type="button"
          onClick={handleDownload}
          size="md"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Download receipt
        </Button>
        <Stack>
          <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            disabled={disabled}
            size="md"
          >
            Share receipt
          </Button>
          <Text size="xs" c="dimmed" ta="center">
            {disabled ? 'Your browser does not support the Web Share API' : ''}
          </Text>
        </Stack>
      </Group>
    </Stack>
  );
}
