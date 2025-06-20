import { useState, useEffect } from "react";
import { useCustomUseEffect } from "../../hooks/useCustomUseEffect";

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [unchanged, setUnchanged] = useState<number>(0);

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

  return (
    <>
      <h2>Counter : {count}</h2>
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
