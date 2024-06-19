import { useState } from "react";
import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import StorageTextarea, {
  StorageTextareaInput,
} from "../components/StorageTextarea";
import { usePageLocalStorage } from "../providers/PageLocalStorageProvider";

interface IStoragePanelProps {
  storageKey: string;
  onClose: () => void;
}

const StoragePanel = (props: IStoragePanelProps) => {
  const { storageKey, onClose } = props;
  const { data, setItem, removeItem } = usePageLocalStorage();
  const storageValue = data[storageKey];
  const [newValue, setNewValue] = useState<string>(storageValue);

  return (
    <Flex
      flexDir="column"
      borderLeft="1px solid"
      borderColor="border-color-light"
      h="full"
      bg="base.800"
    >
      <Box borderBottom="1px solid" borderColor="border-color-light">
        <IconButton
          aria-label="close storage panel"
          icon={<XMarkIcon width="17px" />}
          color="gray.300"
          _hover={{ color: "white" }}
          variant="unstyled"
          px={1}
          onClick={onClose}
        />
      </Box>
      <Box flex={1}>
        <StorageTextarea h="full">
          <StorageTextareaInput
            h="full"
            value={newValue}
            onChange={setNewValue}
            autoFocus
            isBorderless
            resize="none"
          />
        </StorageTextarea>
      </Box>
      <HStack p={2} borderTop="1px solid" borderColor="border-color-light">
        <Button
          onClick={() => {
            setItem(storageKey, newValue);
          }}
        >
          Update
        </Button>
        <Button
          color="red.300"
          onClick={() => {
            removeItem(storageKey);
            onClose();
          }}
        >
          Remove
        </Button>
      </HStack>
    </Flex>
  );
};

export default StoragePanel;
