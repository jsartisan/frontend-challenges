import { useState } from "react";
import { type HistoryEntry, type TLRecord } from "tldraw";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getNote, updateNote } from "../db/notes";
import { useAuth } from "./useAuth";
import { getLocalStorageItem } from "../utils/localStorage";

export function useNotes(key: string) {
  const auth = useAuth();
  const [notes, setNotes] = useState<HistoryEntry<TLRecord> | null>(null);
  const notesFromLocalStorageRaw = getLocalStorageItem(key, null);

  if (!auth.user) return { isLoading: false, notes: notesFromLocalStorageRaw, setNotes };

  const notesQuery = useQuery({
    queryKey: [key],
    queryFn: () => {
      return getNote({ user_id: auth.user.id, path: key });
    },
  });

  const mutation = useMutation({
    mutationFn: (content: string) => {
      return updateNote({ user_id: auth.user.id, path: key, content });
    },
    onSuccess: () => {
      localStorage.removeItem(key);
      notesQuery.refetch();
    },
  });

  if (notesQuery.isFetching) return { isLoading: true, notes: null, setNotes };

  // "PGRST116" is the error code for a note that does not exist
  if (notesQuery.data?.error?.code === "PGRST116") {
    setNotes(notesFromLocalStorageRaw);

    mutation.mutate(notesFromLocalStorageRaw);

    return { notes: notesFromLocalStorageRaw, isLoading: mutation.isPending, setNotes };
  }

  setNotes(notesQuery.data?.data.content);

  return { notes, isLoading: notesQuery.isLoading || mutation.isPending, setNotes };
}
