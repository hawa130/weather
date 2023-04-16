import { ReactNode } from 'react';
import { Group, MantineNumberSize, Table } from '@mantine/core';

export interface DataItemsProps {
  data: { icon?: ReactNode, title: ReactNode, value?: ReactNode, fallback?: ReactNode }[];
  fallback?: ReactNode;
  spacing?: MantineNumberSize;
  withBorder?: boolean;
  align?: 'left' | 'right' | 'center';
}

export default function DataItems({ data, fallback, spacing, withBorder, align }: DataItemsProps) {
  return (
    <Table verticalSpacing={spacing} withBorder={withBorder} withColumnBorders={withBorder}>
      <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td style={{ opacity: 0.75, border: withBorder ? undefined : 'none', textAlign: align }}>
            {item.icon ? (
              <Group spacing="sm">{item.icon}{item.title}</Group>
            ) : item.title}
          </td>
          <td style={{ border: withBorder ? undefined : 'none', textAlign: align }}>
            {item.value ?? item.fallback ?? fallback}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}