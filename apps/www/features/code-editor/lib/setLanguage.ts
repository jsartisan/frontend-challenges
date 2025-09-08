export const setLanguage = function (activeFile) {
  switch (activeFile.split(".").pop()) {
    case "js":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "html":
      return "html";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "svelte":
      return "html";
    default:
      return "plaintext";
  }
};
