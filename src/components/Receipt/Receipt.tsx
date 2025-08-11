import { Image, Stack, Text, Title } from '@mantine/core';

export function Receipt({ receiptRef }: { receiptRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Stack
      ref={receiptRef}
      p="xl"
      gap="md"
      bd="1px solid #e0e0e0"
      bdrs="md"
      justify="center"
      align="center"
      w="fit-content"
      maw={400}
      mx="auto"
    >
      <Title>Receipt</Title>
      <Text>This is a receipt</Text>
      <Image
        src="https://placeholdr.ai/2e17c53f-b4d5-4af5-a772-6b3c6cfab942/256/256"
        alt="Receipt"
        w={256}
        width={256}
        height={256}
      />
    </Stack>
  );
}
