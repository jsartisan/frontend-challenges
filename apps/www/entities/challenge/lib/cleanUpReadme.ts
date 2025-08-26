export function cleanUpReadme(text: string) {
  return text
    .replace(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/, "")
    .replace(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/, "")
    .trim();
}
