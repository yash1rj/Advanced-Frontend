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

// ***********************************************************************
// Test Case 1: Without an immediate flag

// Input:
// const Example = () => {
//   const print = () => {
//     console.log("hello");
//   };

//   const debounced = useDebounce(print, 500);

//   useEffect(() => {
//     window.addEventListener("mousemove", debounced, false);

//     return () => {
//       window.removeEventListener("mousemove", debounced, false);
//     };
//   });

//   return <></>;
// };

// Output:
// "hello" //after 500 millisecond delay when user stops moving mouse


// ***********************************************************************
// Test Case 2: With immediate flag

// Input:
// const Example = () => {
//   const print = () => {
//     console.log("hello");
//   };
  
//   // immediate
//   const debounced = useDebounce(print, 500, true);

//   useEffect(() => {
//     window.addEventListener("mousemove", debounced, false);

//     return () => {
//       window.removeEventListener("mousemove", debounced, false);
//     };
//   });

//   return <></>;
// };

// Output:
// "hello" //immediately only once till the mouse moving is not stopped
// "hello" //immediately again once till the mouse moving is not stopped