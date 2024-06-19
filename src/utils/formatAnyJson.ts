const indentSize = 2;
const addIndent = (level: number) => " ".repeat(level * indentSize);

/**
 * Format a JSON string with any structure.
 *
 * Maintain duplicate keys and preserve the
 * original order of keys.
 *
 */
const formatAnyJson = (jsonString: string) => {
  try {
    let result = "";
    let indentLevel = 0;

    let inString = false;

    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString[i];

      if (char === '"' && jsonString[i - 1] !== "\\") {
        inString = !inString;
      }

      if (!inString) {
        switch (char) {
          case "{":
          case "[":
            result += char + "\n" + addIndent(++indentLevel);
            break;
          case "}":
          case "]":
            result += "\n" + addIndent(--indentLevel) + char;
            break;
          case ",":
            result += char + "\n" + addIndent(indentLevel);
            break;
          case ":":
            result += ": ";
            break;
          default:
            if (char !== " " && char !== "\n" && char !== "\t") {
              result += char;
            }
            break;
        }
      } else {
        result += char;
      }
    }

    return result;
  } catch (error) {
    console.error("Formatting error:", error);
    return jsonString; // Return the original string if there's an error
  }
};

export default formatAnyJson;
