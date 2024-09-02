import { useEffect, useState } from "react";

export function useLocalStorageChallengeFiles(path: string) {
  const [files, setFiles] = useState({});

  useEffect(() => {
    const files = localStorage.getItem(path);

    if (files) {
      try {
        setFiles(JSON.parse(files));
      } catch (error) {
        console.error(error);
      }
    }
  }, [path]);

  return files;
}
