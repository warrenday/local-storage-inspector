import { Box, Button, HStack, Input } from "@chakra-ui/react";
import StorageTable from "./containers/StorageTable";
import { SplitPaneLayout } from "./components/SplitPaneLayout";
import { useState } from "react";
import NewItemModalPopover from "./containers/NewItemModal";
import { usePageLocalStorage } from "./providers/PageLocalStorageProvider";
import StoragePanel from "./containers/StoragePanel";
import { NoSymbolIcon, PlusIcon } from "@heroicons/react/16/solid";

interface IHeaderProps {
  filter: string;
  onChange: (filter: string) => void;
}

const Header = (props: IHeaderProps) => {
  const { filter, onChange } = props;
  const { setItem, clearStorage } = usePageLocalStorage();

  return (
    <HStack
      bg="base.800"
      borderBottom="1px solid"
      borderColor="border-color-light"
      p={2}
    >
      <Input
        placeholder="Filter"
        variant="outline"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        maxW="300px"
      />
      <NewItemModalPopover onSave={setItem}>
        <Button leftIcon={<PlusIcon width="13px" />}>Add</Button>
      </NewItemModalPopover>
      <Button
        onClick={clearStorage}
        leftIcon={<NoSymbolIcon width="13px" />}
        color="red.300"
      >
        Clear
      </Button>
    </HStack>
  );
};

const Home = () => {
  const [filter, setFilter] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  return (
    <Box w="100vw" h="100vh">
      <SplitPaneLayout
        header={<Header filter={filter} onChange={setFilter} />}
        leftPane={
          <StorageTable
            filter={filter}
            selectedRowId={selectedRowId || undefined}
            onRowClick={(_, data) => {
              setSelectedRowId(data.id);
            }}
          />
        }
        rightPane={
          selectedRowId ? (
            <StoragePanel
              key={selectedRowId}
              storageKey={selectedRowId}
              onClose={() => {
                setSelectedRowId(null);
              }}
            />
          ) : undefined
        }
      />
    </Box>
  );
};

export default Home;
