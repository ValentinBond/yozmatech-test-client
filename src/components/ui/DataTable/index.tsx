import { JSX, useEffect, useRef, useState } from 'react';
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '../Input';
import { Button } from '../Button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table';

type DataTableProps<T extends RowData> = {
  columns: ColumnDef<T>[];
  data: T[];
  setOrder: (v: string) => void;
  setSortBy: (v: string) => void;
  setPageSize: (v: number) => void;
  setFilter: (v: string) => void;
  setPage: (v: number) => void;
  filter: string;
  pageSize: number;
  page: number;
  pageCount: number;
  isLoading: boolean;
  actions?: (row: T) => JSX.Element;
};

export const DataTable = <T extends RowData>({
  columns,
  data,
  setSortBy,
  setOrder,
  setPageSize,
  pageSize,
  page,
  filter,
  setFilter,
  pageCount,
  setPage,
  isLoading,
  actions,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const skipPageResetRef = useRef(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: {
      sorting,
      globalFilter: filter,
      pagination: { pageSize, pageIndex: page },
    },
    onSortingChange: (updater) => {
      const newPaginationValue =
        updater instanceof Function ? updater(sorting) : updater;
      setSorting(newPaginationValue);
      if (newPaginationValue.length > 0) {
        setSortBy(newPaginationValue[0].id);
        setOrder(newPaginationValue[0].desc ? 'desc' : 'asc');
      } else {
        setSortBy('');
        setOrder('');
      }
    },
    onGlobalFilterChange: setFilter,
    pageCount,
  });

  useEffect(() => {
    skipPageResetRef.current = true;
    setFilter(filter);
    return () => {
      skipPageResetRef.current = false;
    };
  }, [filter, setFilter]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={filter}
        onChange={(e) => {
          setPage(1);
          setFilter(e.target.value);
        }}
        className="w-full"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === 'asc'
                    ? ' ↑'
                    : header.column.getIsSorted() === 'desc'
                      ? ' ↓'
                      : ''}
                </TableHead>
              ))}
              {actions && <TableHead>Actions</TableHead>}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>...Loading</>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(row.original)}</TableCell>}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Button
            onClick={() => setPage(Math.max(page - 1, 0))}
            disabled={!(page - 1)}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
