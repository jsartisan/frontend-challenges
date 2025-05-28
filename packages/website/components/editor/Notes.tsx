import { useEffect, useState } from "react";
import { STORAGE_KEY } from "@/shared";
import { Editor, HistoryEntry, TLDocument, TLRecord, TLStoreSnapshot, Tldraw, getSnapshot, loadSnapshot } from "tldraw";
import { useAuth } from "~/hooks/useAuth";
import { getNote, updateNote } from "~/db/notes";
import { useDebounce } from "~/hooks/useDebounce";

import "tldraw/tldraw.css";
import { getLocalStorageItem } from "~/utils/localStorage";

type NotesProps = {
  path?: string;
};

// Define a type that includes document and session
type NotesState = {
  document: TLDocument;
  session: any; // Replace 'any' with the correct type if known
};

export default function Notes(props: NotesProps) {
  const { path } = props;
  const auth = useAuth();
  const key = `${STORAGE_KEY}/notes/${path}`;
  const [isLoading, setIsLoading] = useState(true);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [notes, setNotes] = useState<NotesState | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (!auth.user) {
      setIsLoading(false);
      setNotes(getLocalStorageItem(key, null));

      return;
    }

    getNote({ user_id: auth.user.id, path: key })
      .then((note) => {
        if (note.data.content) {
          setNotes(JSON.parse(note.data.content));
          setIsLoading(false);
        }

        if (note.error.code === "PGRST116") {
          setNotes(getLocalStorageItem(key, null));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (editor) {
      if (notes && !isLoading) {
        loadSnapshot(editor.store, notes as unknown as TLStoreSnapshot);
      }

      editor.store.listen(
        () => {
          const { document, session } = getSnapshot(editor.store);
          if (auth.user) {
            debouncedSaveToCloud({ document, session });
            return;
          }

          localStorage.setItem(key, JSON.stringify({ document, session }));
          setNotes({ document: document as unknown as TLDocument, session });
        },
        { scope: "document", source: "user" },
      );
    }
  }, [editor, isLoading, notes]);

  const onChange = (snapshot: HistoryEntry<TLRecord>) => {
    updateNote({
      user_id: auth.user.id,
      path: key,
      content: JSON.stringify(snapshot),
    });
  };

  const debouncedSaveToCloud = useDebounce(onChange, auth.user ? 1000 : 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Tldraw onMount={setEditor} />;
}
