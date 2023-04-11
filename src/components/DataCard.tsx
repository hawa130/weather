import { Box, BoxProps, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

export interface DataCardProps extends BoxProps {
  icon: ReactNode;
  title: string;
}

export default function DataCard({ icon, title, children, ...props }: DataCardProps) {
  return (
    <Box className="border rounded-lg" px="md" pb="sm" {...props}>
      <Group py="sm" spacing="xs">
        <Text color="dimmed">{icon}</Text>
        <Text color="dimmed" size="sm">{title}</Text>
      </Group>
      {children}
    </Box>
  );
}