import { Box, BoxProps, Group, Text } from '@mantine/core';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { cls } from '@/utils/helper';

export interface DataCardProps extends BoxProps {
  icon: ReactNode;
  title: string;
}

const DataCard = forwardRef(
  ({ icon, title, children, className, ...props }: DataCardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Box
        px="md" pb="sm" ref={ref}
        className={cls(className, 'bg-semi-transparent backdrop-blur rounded-lg border-t border-semi-transparent flex flex-col overflow-hidden')}
        {...props}
      >
        <Group py="sm" spacing="xs">
          <Text>{icon}</Text>
          <Text size="sm">{title}</Text>
        </Group>
        <Box className="flex-grow">
          {children}
        </Box>
      </Box>
    );
  });

export default DataCard;