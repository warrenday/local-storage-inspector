import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  ButtonProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import StorageTextareaProvider, {
  useStorageTextarea,
} from "./StorageTextareaProvider";
import formatAnyJson from "../../utils/formatAnyJson";

/**
 * Detect if the initial value is a valid JSON string.
 * Does not update if the value changes later.
 */
const useDetectInitialJson = (value: string) => {
  const [isJson, setIsJson] = useState<null | boolean>(null);

  useEffect(() => {
    if (isJson !== null) {
      return;
    }

    try {
      JSON.parse(value);
      setIsJson(true);
    } catch (e) {
      setIsJson(false);
    }
  }, [isJson, setIsJson, value]);

  return isJson || false;
};

interface IJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

const JsonEditor = (
  props: IJsonEditorProps & Omit<BoxProps, "onChange" | "onFocus" | "onBlur">
) => {
  const { value, onChange, autoFocus, ...rest } = props;
  const [isFocused, setFocused] = useState(false);
  const [isFormatted, setFormatted] = useState(false);

  const format = useCallback(() => {
    try {
      const formattedValue = formatAnyJson(value);
      onChange(formattedValue);
    } catch (e) {
      console.log(e);
      // Do nothing
    }
  }, [onChange, value]);

  useEffect(() => {
    if (!isFormatted) {
      format();
      setFormatted(true);
    }
  }, [isFormatted, setFormatted, format]);

  return (
    <CodeEditor
      value={value}
      onChange={(value) => {
        onChange(value as string);
      }}
      autoFocus={autoFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      border="1px solid"
      borderColor="border-color-light"
      backgroundColor="base.700"
      rounded="md"
      minHeight="150px"
      resize="vertical"
      overflow="auto"
      p={2}
      transition="outline 0.2s"
      outline="2px solid transparent"
      {...(isFocused && { outline: "2px solid", outlineColor: "blue.300" })}
      {...rest}
    />
  );
};

const ModeButton = (props: ButtonProps) => {
  return (
    <Button
      size="xs"
      color="gray.400"
      _active={{ bg: "blue.500", color: "white" }}
      {...props}
    />
  );
};

interface IStorageTextareaInputProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  isBorderless?: boolean;
}

export const StorageTextareaInput = (
  props: IStorageTextareaInputProps & Omit<BoxProps, "onChange">
) => {
  const { value, onChange, autoFocus, isBorderless, ...rest } = props;
  const isJson = useDetectInitialJson(value);
  const { mode, setMode } = useStorageTextarea();

  useEffect(() => {
    setMode(isJson ? "json" : "text");
  }, [isJson, setMode]);

  return (
    <>
      {mode === "text" && (
        <Textarea
          placeholder="Value"
          variant="outline"
          minHeight="150px"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
          {...(isBorderless && {
            border: "none",
            rounded: 0,
            _focus: {
              boxShadow: "none",
            },
          })}
          {...(rest as TextareaProps)}
        />
      )}
      {mode === "json" && (
        <JsonEditor
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          {...(isBorderless && {
            border: "none",
            rounded: 0,
            outline: "none !important",
          })}
          {...rest}
        />
      )}
    </>
  );
};

interface IStrorageTextareaProps {}

const StorageTextareaInner = (props: IStrorageTextareaProps & BoxProps) => {
  const { children, ...rest } = props;
  const { mode, setMode } = useStorageTextarea();

  return (
    <Box w="full" pos="relative" {...rest}>
      <Box h="full" pos="relative" zIndex={0}>
        {children}
      </Box>
      <ButtonGroup
        size="xs"
        pos="absolute"
        right={2}
        top={2}
        zIndex={1}
        isAttached
      >
        <ModeButton onClick={() => setMode("text")} isActive={mode === "text"}>
          Text
        </ModeButton>
        <ModeButton onClick={() => setMode("json")} isActive={mode === "json"}>
          JSON
        </ModeButton>
      </ButtonGroup>
    </Box>
  );
};

const StorageTextarea = (props: IStrorageTextareaProps & BoxProps) => {
  return (
    <StorageTextareaProvider>
      <StorageTextareaInner {...props} />
    </StorageTextareaProvider>
  );
};

export default StorageTextarea;
