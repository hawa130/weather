import { ReactNode } from 'react';
import { MantineNumberSize, Table } from '@mantine/core';

export interface DataItemsProps {
  data: { title: ReactNode, value?: ReactNode, fallback?: ReactNode }[];
  fallback?: ReactNode;
  spacing?: MantineNumberSize;
  withBorder?: boolean;
}

export default function DataItems({ data, fallback, spacing, withBorder }: DataItemsProps) {
  return (
    <Table verticalSpacing={spacing} withBorder={withBorder} withColumnBorders={withBorder}>
      <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td style={{ opacity: 0.75, border: withBorder ? undefined : 'none' }}>
            {item.title}
          </td>
          <td style={{ border: withBorder ? undefined : 'none' }}>
            {item.value ?? item.fallback ?? fallback}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}