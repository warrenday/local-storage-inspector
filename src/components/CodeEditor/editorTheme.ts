import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { colors } from "../../theme";

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const chalky = "#e5c07b";
const coral = "#e06c75";
const cyan = "#56b6c2";
const invalid = "#ffffff";
const ivory = "#abb2bf";
const stone = "#7d8799"; // Brightened compared to original to increase contras
const malibu = "#61afef";
const sage = "#98c379";
const whiskey = "#d19a66";
const violet = "#c678dd";
const darkBackground = "#21252b";
const highlightBackground = "#1a202c";
const background = colors.base[800];
const tooltipBackground = colors.base[800];
const tooltipBorder = colors["border-color"];
const selection = "#3E4451";
const cursor = "#528bff";

/// The editor theme styles for One Dark.
export const customDarkTheme = EditorView.theme(
  {
    "&": {
      color: ivory,
      fontSize: "12px",
    },

    "&.cm-focused": {
      outline: "none",
    },

    ".variable-highlight, .variable-highlight > span": {
      color: "var(--chakra-colors-blue-400) !important",
    },

    ".variable-highlight--notfound, .variable-highlight--notfound > span": {
      color: "var(--chakra-colors-red-400) !important",
      background: "var(--chakra-colors-red-900) !important",
    },
    ".variable-tooltip": {
      padding: "8px 12px",
    },
    ".cm-tooltip-above": {
      transform: "translateY(-5px)",
    },

    ".cm-content": {
      caretColor: cursor,
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: selection },

    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },

    ".cm-gutters": {
      backgroundColor: background,
      color: stone,
      border: "none",
    },

    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "1px solid",
      borderColor: tooltipBorder,
      backgroundColor: tooltipBackground,
      boxShadow: "var(--chakra-shadows-dark-lg)",
      borderRadius: "var(--chakra-radii-md)",
      fontSize: "14px",
    },
    ".cm-tooltip.cm-tooltip-autocomplete > ul": {
      fontFamily: "Inter, sans-serif",
      borderRadius: "var(--chakra-radii-md)",
      padding: "8px 0px",
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip.cm-tooltip-autocomplete > ul > li": {
      padding: "6px 12px",
      lineHeight: "21px",
    },
    ".cm-tooltip.cm-tooltip-autocomplete > ul > li:hover": {
      backgroundColor: highlightBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: `${highlightBackground} !important`,
        color: "#fff",
      },
      "& > ul > li[aria-selected] .cm-completionDetail": {
        color: "#fff",
      },
    },
    ".cm-completionDetail": {
      color: sage,
    },
    ".cm-tooltip.cm-completionInfo": {
      padding: "8px 12px",
      maxWidth: "400px",
      minWidth: "115px",
    },
    ".cm-completionIcon": {
      display: "none",
    },
  },
  { dark: true }
);

/// The highlighting style for code in the One Dark theme.
export const customDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: violet },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral,
  },
  { tag: [t.function(t.variableName), t.labelName], color: malibu },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator], color: ivory },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    color: chalky,
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
    ],
    color: cyan,
  },
  { tag: [t.meta, t.comment], color: stone },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: stone, textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: coral },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
  { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
  { tag: t.invalid, color: invalid },
]);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const customDark: Extension = [
  customDarkTheme,
  syntaxHighlighting(customDarkHighlightStyle),
];
