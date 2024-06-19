import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";

interface IModalPopoverBodyProps extends Omit<ModalBodyProps, "children"> {
  children:
    | React.ReactNode
    | ((args: { onClose: () => void }) => React.ReactNode);
  onClose?: () => void;
}

export const ModalPopoverBody = (props: IModalPopoverBodyProps) => {
  const { onClose } = props;
  return (
    <ModalBody p={6} {...props}>
      {typeof props.children === "function"
        ? props.children({ onClose: () => onClose?.() })
        : props.children}
    </ModalBody>
  );
};

interface IModalPopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ModalPopoverButton = (props: IModalPopoverButtonProps) => {
  const { children, onClick } = props;

  return <Box onClick={onClick}>{children}</Box>;
};

interface IModalPopoverProps extends Omit<Partial<ModalProps>, "children"> {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ModalPopover = (props: IModalPopoverProps) => {
  const { children, title, ...other } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === ModalPopoverButton) {
            const props = { onClick: onOpen };
            return React.cloneElement(child, props);
          }
        }
      })}
      <Modal {...other} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="sm" />
          {title && <ModalHeader fontSize="sm">{title}</ModalHeader>}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === ModalPopoverBody) {
                return React.cloneElement(child, {
                  onClose,
                } as IModalPopoverBodyProps);
              }
            }
          })}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPopover;
