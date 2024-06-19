import { Box, BoxProps } from "@chakra-ui/react";
import useCodeEditor from "./useCodeEditor";
import { useEffect } from "react";

interface ICodeEditorViewProps {
  value: string;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
}

const CodeEditor = (props: ICodeEditorViewProps & BoxProps) => {
  const {
    value,
    onChange,
    onBlur,
    onFocus,
    readOnly = false,
    autoFocus,
    ...rest
  } = props;

  const { ref, editor } = useCodeEditor({
    value,
    onChange,
    onBlur,
    onFocus,
    readOnly,
  });

  useEffect(() => {
    if (autoFocus && editor) {
      editor.focus();
    }
  }, [autoFocus, editor]);

  return <Box {...rest} ref={ref} />;
};

export default CodeEditor;
