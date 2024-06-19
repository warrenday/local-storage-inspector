import { useMemo } from "react";
import { ITableProps, Table } from "../components/Table";
import { usePageLocalStorage } from "../providers/PageLocalStorageProvider";

interface IRowData {
  id: string;
  storageKey: string;
  value: string;
}

interface IStorageTableProps {
  filter: string;
  onRowClick: ITableProps<IRowData>["onRowClick"];
  selectedRowId?: string;
}

const StorageTable = (props: IStorageTableProps) => {
  const { onRowClick, selectedRowId, filter } = props;
  const { data } = usePageLocalStorage();

  const tableData = useMemo(() => {
    const filterLower = filter.toLowerCase();
    return Object.keys(data)
      .map((key) => ({
        id: key,
        storageKey: key,
        value: data[key],
      }))
      .filter((row) => {
        return (
          row.storageKey.toLowerCase().includes(filterLower) ||
          row.value.toLowerCase().includes(filterLower)
        );
      });
  }, [data, filter]);

  const columns = useMemo(() => {
    const cols: ITableProps<IRowData>["columns"] = [
      {
        Header: "Key",
        accessor: "storageKey",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ];

    return cols;
  }, []);

  return (
    <Table
      data={tableData}
      columns={columns}
      onRowClick={onRowClick}
      selectedRowId={selectedRowId}
    />
  );
};

export default StorageTable;
