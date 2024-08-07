export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const pipe = (value: any, ...fns: ((any) => any)[]) => fns.reduce((acc, fn) => fn(acc), value);
