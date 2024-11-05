import { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import type { AppState } from "@excalidraw/excalidraw/types/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

type NotesProps = {
  path?: string;
};

function getInitialData(path: string) {
  const savedData = localStorage.getItem(path);
  if (savedData) {
    const { elements, appState } = JSON.parse(savedData);

    return {
      elements,
      appState: {
        ...appState,
        collaborators: [],
      },
    };
  }

  return {
    elements: [],
    appState: {},
  };
}

export default function Notes(props: NotesProps) {
  const { path } = props;
  const storageKey = `excalidraw-${path}`;

  const [initialData] = useState<{
    elements: ExcalidrawElement[];
    appState: Partial<AppState>;
  }>(() => getInitialData(storageKey));

  const onChange = (elements: ExcalidrawElement[], appState: AppState) => {
    localStorage.setItem(storageKey, JSON.stringify({ elements, appState }));
  };

  return <Excalidraw initialData={initialData} onChange={onChange} />;
}
