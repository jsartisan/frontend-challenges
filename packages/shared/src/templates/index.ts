import { VUE_TEMPLATE } from "./vue";
import { TESTS_TEMPLATE } from "./tests";
import { REACT_TEMPLATE } from "./react";
import { SVELTE_TEMPLATE } from "./svelte";
import { STATIC_TEMPLATE } from "./static";
import { VANILLA_TEMPLATE } from "./vanilla";
import { TYPESCRIPT_TEMPLATE } from "./typescript";

export const TEMPLATES = {
  static: STATIC_TEMPLATE,
  vanilla: VANILLA_TEMPLATE,
  typescript: TYPESCRIPT_TEMPLATE,
  javascript: TESTS_TEMPLATE,
  react: REACT_TEMPLATE,
  vue: VUE_TEMPLATE,
  svelte: SVELTE_TEMPLATE,
};
