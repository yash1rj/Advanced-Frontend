import { useCallback, useRef } from "react";

export const useDebounce = (
  func: any,
  delay: number = 300,
  immediate: boolean = false
) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>(null);

  const debouncedFunction = useCallback(
    function (this: any) {
      let context = this,
        args = arguments;

      // When should the func be called ?
      // If immediate is true and not already in a timeout then the call now
      const callNow = immediate && !timerId.current;

      // clear existing timeouts
      // prevents multiple executions within delay period
      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = setTimeout(() => {
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timerId.current = null;

        // check if the function already ran with the immediate flag
        if (!immediate) {
          // call the original function with apply
          func.apply(context, args);
        }
      }, delay);

      // immediate mode and no wait timer? Execute the function immediately
      if (callNow) func.apply(context, args);
    },
    [func, delay, immediate]
  );

  return debouncedFunction;
};
