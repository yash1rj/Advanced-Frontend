import { useRef } from "react";

export const useCustomUseEffect = (effect: () => {}, deps?: any) => {
  const isFirstRender = useRef(true);
  const prevDepsRef = useRef([]);

  // First Render
  if (isFirstRender.current) {
    // execute code first time and then set it to false as it will revalidate each render
    isFirstRender.current = false;

    const cleanUp = effect();

    if (cleanUp && typeof cleanUp === "function") {
      cleanUp();
    }
    return;
  }

  // comparing previous deps with current deps
  const dependencyChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDepsRef.current)
    : true;

  if (dependencyChanged) {
    const cleanUp = effect();
    if (cleanUp && typeof cleanUp === "function") {
      cleanUp();
    }
  }

  prevDepsRef.current = deps ? deps : [];
};
