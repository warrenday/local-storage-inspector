import { EditorView } from "codemirror";
import { useEffect, useRef, useState } from "react";
import createEditor from "./baseEditor";
// We use an event emitter to decouple the editor from the
// react lifecycle. This means we do not need to destroy the
// editor any time a callback prop changes.
//
// Instead we can subscribe and unsubscribe to events
// when props change.
import createEventEmitter from "./editorEvents";

const useCodeEditor = (args: {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
}) => {
  const { value, onChange, onBlur, onFocus, readOnly } = args;

  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>();
  const emitterRef = useRef(createEventEmitter());

  // Load value back into editor
  useEffect(() => {
    if (editor && (value || value === "")) {
      const editorValue = editor.state.doc.toString();

      // Prevent infinite loop
      if (editorValue === value) {
        return;
      }

      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value, editor]);

  // Initialize the editor
  useEffect(() => {
    const editorEvents = emitterRef.current;

    const editorView = createEditor(ref.current!, {
      onChange: (value) => editorEvents.emit("change", value),
      onBlur: () => editorEvents.emit("blur"),
      onFocus: () => editorEvents.emit("focus"),
      readOnly,
    });
    setEditor(editorView);

    return () => {
      editorView.destroy();
      setEditor(undefined);
    };
  }, [readOnly]);

  // Subscribe to editor events
  useEffect(() => {
    const editorEvents = emitterRef.current;

    const changeListener = (value: string) => onChange?.(value);
    editorEvents.on("change", changeListener);

    const blurListener = () => onBlur?.();
    editorEvents.on("blur", blurListener);

    const focusListener = () => onFocus?.();
    editorEvents.on("focus", focusListener);

    return () => {
      editorEvents.off("change", changeListener);
      editorEvents.off("blur", blurListener);
      editorEvents.off("focus", focusListener);
    };
  }, [onChange, onBlur, onFocus]);

  return { ref, editor };
};

export default useCodeEditor;
