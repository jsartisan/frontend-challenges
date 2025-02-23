import debounce from "lodash/debounce";
import React, { useRef } from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const callbackRef = useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => debounce((...args) => callbackRef.current(...args), delay), [delay]);
}
