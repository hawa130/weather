import { Box, BoxProps, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { cls } from '@/utils/helper';

export interface DataCardProps extends BoxProps {
  icon: ReactNode;
  title: string;
}

export default function DataCard({ icon, title, children, className, ...props }: DataCardProps) {
  return (
    <Box
      px="md" pb="sm"
      className={cls(className, 'bg-semi-transparent backdrop-blur rounded-lg border-t border-semi-transparent')}
      {...props}
    >
      <Group py="sm" spacing="xs">
        <Text>{icon}</Text>
        <Text size="sm">{title}</Text>
      </Group>
      {children}
    </Box>
  );
}