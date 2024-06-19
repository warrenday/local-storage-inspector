// Great thread on theming:
// https://github.com/chakra-ui/chakra-ui/issues/2347#issuecomment-997215492

import { ThemeComponents, ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const colors = {
  background: "#02040a",
  default: "#fff",
  "border-color": "#21262d",
  "border-color-light": "#373e47",
  base: {
    700: "#151d26",
    800: "#0d1116",
    900: "#02040a",
  },
};

const components: ThemeComponents = {
  Table: {
    baseStyle: {
      th: {
        fontSize: "xs",
        textTransform: "normal",
      },
      td: {
        fontSize: "xs",
      },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        backgroundColor: "base.800",
        border: "1px solid",
        borderColor: "border-color",
        rounded: "md",
      },
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "600",
    },
    variants: {
      primary: {
        backgroundColor: "#fff",
        color: "#000",
      },
      link: {
        fontWeight: "400",
      },
    },
    defaultProps: {
      size: "xs",
    },
  },
  Heading: {
    baseStyle: {
      color: "#fff",
    },
  },
  Text: {
    baseStyle: {
      color: "gray.300",
      fontSize: "xs",
    },
  },
  List: {
    baseStyle: {
      item: {
        fontSize: "xs",
        color: "gray.300",
      },
    },
  },
  Link: {
    baseStyle: {
      color: "blue.400",
      textDecoration: "underline",
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          border: "1px solid",
          borderColor: "border-color-light",
          backgroundColor: "base.700",
          borderRadius: "md",
        },
      },
    },
    defaultProps: {
      size: "xs",
      variant: null,
    },
  },
  Textarea: {
    variants: {
      outline: {
        border: "1px solid",
        borderColor: "border-color-light",
        backgroundColor: "base.700",
        borderRadius: "md",
      },
    },
    defaultProps: {
      size: "xs",
      variant: undefined,
    },
  },
  NumberInput: {
    variants: {
      outline: {
        field: {
          border: "1px solid",
          borderColor: "border-color-light",
          backgroundColor: "base.700",
          borderRadius: "md",
        },
      },
    },
    defaultProps: {
      size: "xs",
      variant: null,
    },
  },
  Select: {
    variants: {
      outline: {
        field: {
          border: "1px solid",
          borderColor: "border-color-light",
          backgroundColor: "base.700",
          borderRadius: "md",
        },
      },
    },
    defaultProps: {
      size: "xs",
      variant: null,
    },
  },
  Menu: {
    baseStyle: {
      list: {
        backgroundColor: "base.800",
        borderColor: "border-color",
      },
      item: {
        fontSize: "xs",
        backgroundColor: "base.800",
        _hover: {
          backgroundColor: "gray.800",
        },
      },
    },
  },
  Popover: {
    baseStyle: {
      content: {
        backgroundColor: "base.800",
        borderColor: "border-color",
      },
    },
  },
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors,
  styles: {
    global: () => ({
      body: {
        color: "default",
        bg: colors.background,
        fontWeight: "400",
      },
    }),
  },
  components,
});

export default theme;
