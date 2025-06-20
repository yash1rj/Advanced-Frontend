import { useEffect, useRef } from "react";

const isDepsChanged = (prevDeps: any[], currentDeps: any[]) => {
  // Check if the prev dependencies are null,
  if (prevDeps === null) return false;

  // Check if the length of the prev dependencies is not equal
  // to the length of the current dependencies
  if (prevDeps.length !== currentDeps.length) {
    return true;
  }
  // Iterate over the deps and check if the prev dependencies
  // are not equal to the current dependencies
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== currentDeps[i]) {
      return true;
    }
  }
  return false;
};

export const useCustomUseMemo = (cb: () => {}, deps: any[]) => {
  // Store the previous/cached value
  const memoizedRef = useRef<{ value: any; deps: any[] } | null>(null);

  // Checking changes in dependencies
  // If memoized value is empty, it is the initial render,
  // If it's not the initial render, then check if the dependencies have changed
  if (!memoizedRef.current || !isDepsChanged(memoizedRef.current?.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }

  // Cleanup logic
  useEffect(() => {
    // Clear the memoized value, when the component is unmounted
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // Return the memoized value, if any
  return memoizedRef.current?.value;
};
