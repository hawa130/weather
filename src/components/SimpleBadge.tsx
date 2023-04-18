import { HTMLAttributes } from 'react';
import { cls } from '@/utils/helper';

export interface SimpleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
}

export function SimpleBadge({ className, children, ...props }: SimpleBadgeProps) {
  return (
    <span
      className={cls('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-semi-transparent whitespace-nowrap', className)}
      {...props}
    >{children}</span>
  );
}