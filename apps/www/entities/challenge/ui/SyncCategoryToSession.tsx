"use client";

import { useEffect } from "react";

import type { Category } from "~/entities/category/model/types";

import { setSessionStorageItem } from "~/shared/lib/sessionStorage";

type SyncCategoryToSessionProps = {
  category: Category;
};

/**
 * Syncs the current category to sessionStorage.
 * This allows the challenge page sheet to show only challenges from this category.
 */
export function SyncCategoryToSession({ category }: SyncCategoryToSessionProps) {
  useEffect(() => {
    setSessionStorageItem("category", JSON.stringify([category]));
  }, [category]);

  return null;
}
