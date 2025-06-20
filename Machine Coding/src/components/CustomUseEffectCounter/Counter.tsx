import { useState, useEffect, useMemo } from "react";
import { useCustomUseEffect } from "../../hooks/useCustomUseEffect";
import { useCustomUseMemo } from "../../hooks/useCustomUseMemo";

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [unchanged, setUnchanged] = useState<number>(100);

  useCustomUseEffect(() => {
    console.log("Effect triggered : ", count);

    return () => {
      console.log("Cleanup ran");
    };
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  // const havyCalcsMemoized = useCallback(heavyCalculation,[count])
  const havyCalcsMemoized = useCustomUseMemo(() => {
    console.log("heavy Calculations... ", count);
    return unchanged * unchanged;
  }, [count]);

  return (
    <>
      <h2>Counter : {count}</h2>
      <h3>Memoized Calculation: {havyCalcsMemoized}</h3>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <button type="button" onClick={decrement}>
        Decrement
      </button>
    </>
  );
}

export default Counter;
