import { Box, BoxProps, Group, MantineColor, SystemProp, Text } from '@mantine/core';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { cls } from '@/utils/helper';

export interface DataCardProps extends BoxProps, HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  extra?: ReactNode;
  titleBg?: SystemProp<MantineColor>;
  titleClass?: string;
  onTitleClick?: MouseEventHandler<HTMLDivElement>;
}

const DataCard = forwardRef(
  ({
     icon, title, children, className, extra, titleBg, onTitleClick, titleClass, ...props
   }: DataCardProps, ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Box
        px="md" pb="sm" ref={ref}
        className={cls(className, 'bg-semi-transparent backdrop-blur rounded-lg border-t border-semi-transparent flex flex-col overflow-hidden')}
        {...props}
      >
        <Group
          mx={-12} px={12} py="sm" spacing="xs" position="apart"
          bg={titleBg}
          className={cls('transition-colors duration-200', onTitleClick ? 'cursor-pointer' : undefined, titleClass)}
          onClick={onTitleClick}
        >
          <Group spacing="xs">
            <Text>{icon}</Text>
            <Text size="sm">{title}</Text>
          </Group>
          {extra}
        </Group>
        <Box className="flex-grow">
          {children}
        </Box>
      </Box>
    );
  });

export default DataCard;