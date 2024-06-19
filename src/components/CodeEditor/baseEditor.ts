import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { bracketMatching, syntaxHighlighting } from "@codemirror/language";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import {
  history,
  defaultKeymap,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { linter } from "@codemirror/lint";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { customDarkHighlightStyle, customDark } from "./editorTheme";

const createEditor = (
  parentElement: Element,
  args: {
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onSave?: () => void;
    readOnly?: boolean;
  }
) => {
  const { onChange, onBlur, onFocus, onSave, readOnly } = args;

  // Create a custom keymap to handle Mod-s
  // which is cmd+s on mac and ctrl+s on windows
  //
  // This will allow the user to save the current
  // document
  const customKeymap = [
    {
      key: "Mod-s",
      preventDefault: true,
      run: () => {
        if (onSave) {
          onSave();
        }
        return true; // Indicates the event is handled
      },
    },
  ];

  const state = EditorState.create({
    extensions: [
      EditorState.readOnly.of(readOnly || false),
      // Theme
      customDark,
      // Handle changes
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          const value = update.state.doc.toString();
          onChange(value);
        }
      }),
      EditorView.domEventHandlers({
        blur: onBlur,
        focus: onFocus,
      }),
      // Extensions
      bracketMatching(),
      closeBrackets(),
      history(),
      autocompletion({
        closeOnBlur: false,
      }),
      syntaxHighlighting(customDarkHighlightStyle),
      // Keymaps
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...customKeymap,
        indentWithTab,
      ]),
      // Language specific extensions
      json(),
      linter(jsonParseLinter()), // Add JSON linting
    ],
  });

  const view = new EditorView({
    state,
    parent: parentElement,
  });

  return view;
};

export default createEditor;
