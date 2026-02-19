'use client';

import type { CSSProperties, ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  render: (item: T) => ReactNode;
  headerStyle?: CSSProperties;
  cellStyle?: CSSProperties;
}

interface DataTableProps<T> {
  items: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  isRowSelected?: (item: T) => boolean;
  getRowAriaLabel?: (item: T) => string;
}

export default function DataTable<T>({
  items,
  columns,
  getRowKey,
  onRowClick,
  isRowSelected,
  getRowAriaLabel,
}: DataTableProps<T>) {
  const isInteractive = Boolean(onRowClick);

  return (
    <table className="data-grid">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={column.headerStyle}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={getRowKey(item)}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={isRowSelected?.(item) ? 'selected' : ''}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-label={isInteractive ? getRowAriaLabel?.(item) : undefined}
            onKeyDown={
              onRowClick
                ? (event) => {
                    if (event.key === 'Enter') {
                      onRowClick(item);
                    }
                  }
                : undefined
            }
          >
            {columns.map((column) => (
              <td key={column.key} style={column.cellStyle}>
                {column.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
