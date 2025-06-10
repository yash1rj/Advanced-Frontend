import { useCallback, useEffect, useRef } from "react";

interface ThrottleOptions {
  leading: boolean;
  trailing: boolean;
}

export const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  option: ThrottleOptions = { leading: true, trailing: true }
) => {
  // When leading is enabled the first function will invoke right away
  // and then after the specified delay,
  // while when trailing is enabled the first function will invoke after the delay and so on.

  const timerId = useRef<ReturnType<typeof setTimeout>>(null); // track the timer
  const lastArgs = useRef<Parameters<T> | null>(null); // track the args

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  // create a memoized debounce
  const throttle = useCallback(
    function (...args: Parameters<T>) {
      const { trailing, leading } = option;
      // function for delayed call
      const waitFunc = () => {
        // if trailing invoke the function and start the timer again
        if (trailing && lastArgs.current) {
          func(...lastArgs.current);
          lastArgs.current = null;
          timerId.current = setTimeout(waitFunc, wait);
        } else {
          // else reset the timer
          timerId.current = null;
        }
      };

      // if leading run it right away
      if (!timerId.current && leading) {
        func(...args);
      }
      // else store the args
      else {
        lastArgs.current = args;
      }

      // run the delayed call
      if (!timerId.current) {
        timerId.current = setTimeout(waitFunc, wait);
      }
    },
    [func, wait, option]
  );

  return throttle;
};

// ***********************************************************************
// Test Case 1: With leading flag

// Input:
// const Example = () => {
//   const print = () => {
//     console.log("hello");
//   };

//   const throttled = useThrottle(print, 2500, { leading: true, trailing: false });

//   return <button onClick={throttled}> click me</button>;
// };

// Output:
// "hello" // immediately
// "hello" // after 2500 milliseconds of last call
// "hello" // after 2500 milliseconds of last call

// ***********************************************************************
// Test Case 2: With trailing flag

// Input:
// const Example = () => {
//   const print = () => {
//     console.log("hello");
//   };

//   const throttled = useThrottle(print, 2500, { leading: false, trailing: true });

//   return <button onClick={throttled}> click me</button>;
// };

// Output:
// "hello" // after 2500 milliseconds
// "hello" // after 2500 milliseconds of last call
// "hello" // after 2500 milliseconds of last call
