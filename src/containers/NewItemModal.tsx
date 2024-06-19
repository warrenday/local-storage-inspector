import { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";
import ModalPopover, {
  ModalPopoverBody,
  ModalPopoverButton,
} from "../components/ModalPopover";
import StorageTextarea, {
  StorageTextareaInput,
} from "../components/StorageTextarea";

interface INewItemModalPopoverProps {
  children: React.ReactNode;
  onSave: (key: string, value: string) => void;
}

const NewItemModalPopover = (props: INewItemModalPopoverProps) => {
  const { children, onSave } = props;
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const isDisabled = !key || !value;

  return (
    <ModalPopover title="Add storage item">
      <ModalPopoverBody>
        {({ onClose }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(key, value);
              onClose();
            }}
          >
            <VStack alignItems="flex-start" spacing={4}>
              <Input
                placeholder="Key"
                variant="outline"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                autoFocus
              />
              <StorageTextarea>
                <StorageTextareaInput value={value} onChange={setValue} />
              </StorageTextarea>
              <Button isDisabled={isDisabled} type="submit">
                Save
              </Button>
            </VStack>
          </form>
        )}
      </ModalPopoverBody>
      <ModalPopoverButton>{children}</ModalPopoverButton>
    </ModalPopover>
  );
};

export default NewItemModalPopover;
