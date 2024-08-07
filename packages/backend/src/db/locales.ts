import path from "path";
import { pipe } from "@frontend-challenges/shared";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@frontend-challenges/shared";

import { loadFile } from "./fs";

export async function getLocaleVariations<T = string>(filepath: string, fns: ((s: string) => T)[]) {
  const { ext, dir, name } = path.parse(filepath);
  const data: Record<string, T> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const file = pipe((await loadFile(path.join(dir, `${name}.${locale}${ext}`))) || "", ...fns);

    if (file) data[locale] = file;
  }

  if (!data[DEFAULT_LOCALE]) {
    // default version
    const file = pipe((await loadFile(filepath)) || "", ...fns);
    if (file) data[DEFAULT_LOCALE] = file;
  }

  return data;
}
