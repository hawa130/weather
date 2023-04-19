import { Box, BoxProps, Group, LoadingOverlay, MantineColor, SystemProp, Text } from '@mantine/core';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { cls } from '@/utils/helper';

export interface DataCardProps extends BoxProps, HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title?: string;
  extra?: ReactNode;
  titleBg?: SystemProp<MantineColor>;
  titleClass?: string;
  onTitleClick?: MouseEventHandler<HTMLDivElement>;
  loading?: boolean;
  noHeader?: boolean;
}

const DataCard = forwardRef(
  ({
     icon, title, children, className, extra, titleBg, onTitleClick, titleClass, loading, noHeader, ...props
   }: DataCardProps, ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Box
        px="md" pb="sm" pt={noHeader ? 'sm' : undefined} ref={ref} {...props}
        className={cls(loading ? undefined : 'backdrop-blur',
          'relative bg-semi-transparent rounded-lg border-t border-semi-transparent flex flex-col overflow-hidden', className,
        )}
      >
        <LoadingOverlay
          loaderProps={{ color: 'white', size: 'sm' }}
          overlayOpacity={0}
          overlayBlur={4}
          visible={loading ?? false}
          radius="md"
        />
        {noHeader ? null : (
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
        )}
        <Box className="flex-grow">
          {children}
        </Box>
      </Box>
    );
  });

export default DataCard;