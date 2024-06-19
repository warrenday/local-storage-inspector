import {
  useTable,
  HeaderGroup,
  TableInstance,
  TableOptions,
  Row,
} from "react-table";

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

type RowId = string | number;

export type ITableProps<T extends object> = TableOptions<T> & {
  error?: string;
  onRowClick?: (rowId: RowId, data: Row<T>["original"]) => void;
  selectedRowId?: RowId | null;
  isScollBottomMaintained?: boolean;
};

type ITableBodyProps<T extends object> = TableInstance<T> & {
  onRowClick?: (data: Row<T>) => void;
  selectedRowId?: RowId | null;
};

type IBaseRowData = {
  id: RowId;
};

const TableHead = <T extends object>({
  headerGroups,
}: {
  headerGroups: HeaderGroup<T>[];
}) => (
  <Thead bg="base.800">
    {headerGroups.map(({ getHeaderGroupProps, headers }) => {
      const { key, ...headerGroupProps } = getHeaderGroupProps();
      return (
        <Tr
          key={key}
          {...headerGroupProps}
          className="text-left sticky top-0 z-10"
        >
          {headers.map(({ getHeaderProps, render }) => {
            const { key, ...headerProps } = getHeaderProps();
            return (
              <Th
                key={key}
                {...headerProps}
                borderRight="1px"
                borderColor="border-color-light"
                py={1}
                px={2}
                _last={{ borderRight: "none" }}
              >
                {render("Header")}
              </Th>
            );
          })}
        </Tr>
      );
    })}
  </Thead>
);

const TableBody = <T extends IBaseRowData>({
  rows,
  getTableBodyProps,
  prepareRow,
  onRowClick,
  selectedRowId,
}: ITableBodyProps<T>) => (
  <Tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row);

      const isSelected = row.original.id === selectedRowId;
      const { key, ...props } = row.getRowProps();
      const style = { ...props.style, scrollMargin: "31px" };

      return (
        <Tr
          key={key}
          {...props}
          cursor="pointer"
          _even={{
            bg: "base.900",
          }}
          _odd={{
            bg: "base.700",
          }}
          _hover={{
            bg: "blue.700",
          }}
          {...(isSelected
            ? {
                bg: "blue.500",
                color: "white",
                _dark: {
                  bg: "blue.600",
                },
              }
            : {})}
          aria-selected={isSelected}
          style={style}
        >
          {row.cells.map((cell) => {
            const { key, ...cellProps } = cell.getCellProps();
            return (
              <Td
                key={key}
                {...cellProps}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                borderRight="1px"
                borderBottom="none"
                _last={{ borderRight: "none" }}
                borderColor="border-color-light"
                py={1}
                px={2}
              >
                {cell.render("Cell")}
              </Td>
            );
          })}
        </Tr>
      );
    })}
  </Tbody>
);

interface INoResultsProps {
  message?: string;
  data: readonly unknown[];
}

const NoResults = (props: INoResultsProps) => {
  const { message = "No data found", data } = props;

  if (data.length === 0) {
    return (
      <Flex w="full" flex={1} alignItems="center" justifyContent="center">
        <Text>{message}</Text>
      </Flex>
    );
  }

  return null;
};

export const Table = <T extends IBaseRowData>(props: ITableProps<T>) => {
  const { columns, data, error, onRowClick, selectedRowId } = props;
  const tableInstance = useTable({ columns, data });
  const { getTableProps, headerGroups } = tableInstance;

  return (
    <Box
      pos="relative"
      h="full"
      display="flex"
      flexDir="column"
      overflowY="auto"
    >
      <ChakraTable {...getTableProps()} size="xs" w="full" whiteSpace="nowrap">
        <TableHead headerGroups={headerGroups} />
        <TableBody
          {...tableInstance}
          onRowClick={(row) => {
            if (onRowClick) {
              onRowClick(row.original.id, row.original);
            }
          }}
          selectedRowId={selectedRowId}
        />
      </ChakraTable>
      <NoResults message={error} data={data} />
    </Box>
  );
};
