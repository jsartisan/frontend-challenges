import { create } from "zustand";
import { DEFAULT_LOCALE } from "@/constants";
import { SupportedLocales } from "@/types";

type LocaleStore = {
  locale: SupportedLocales;
  setLocale: (locale: SupportedLocales) => void;
};

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: DEFAULT_LOCALE,
  setLocale: (locale) => set({ locale }),
}));
