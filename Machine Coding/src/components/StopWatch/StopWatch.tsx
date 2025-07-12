import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StopWatchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const TimerBlock = styled.input`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid white;
  border-radius: 10px;
  margin: 5px;
  font-size: 32px;
  justify-items: center;

  &:disabled {
    background: lightgray;
  }

  &::-webkit-input-placeholder {
    text-align: center;
    width: inherit;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ActionBtn = styled.button<{ btnType?: string }>`
  height: 50px;
  width: 120px;
  background: ${(p) =>
    p.btnType ? (p.btnType === "pause" ? "orange" : "red") : "white"};
  border-radius: 8px;
  margin: 8px;
  font-size: 18px;

  &:hover {
    background: ${(p) =>
      p.btnType ? (p.btnType === "pause" ? "darkorange" : "darkred") : "white"};
  }
`;

const StopWatch = () => {
  const [timer, setTimer] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const timerCopy = { ...prevTimer };
          timerCopy.second = String(Number(timerCopy.second) - 1);
          if (Number(timerCopy.second) < 0) {
            timerCopy.minute = String(Number(timerCopy.minute) - 1);
            timerCopy.second = "59";

            if (Number(timerCopy.minute) < 0) {
              timerCopy.hour = String(Number(timerCopy.hour) - 1);
              timerCopy.minute = "59";

              if (Number(timerCopy.hour) < 0) {
                clearInterval(intervalRef.current as number);
                return {
                  hour: "",
                  minute: "",
                  second: "",
                };
              }
            }
          }

          return timerCopy;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, [isTimerRunning]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setTimer((prevTimer) => {
      const timerCopy = {
        ...prevTimer,
        ...(field === "hour" && { hour: e.target.value }),
        ...(field === "minute" && { minute: e.target.value }),
        ...(field === "second" && { second: e.target.value }),
      };

      timerCopy.minute = String(
        Number(timerCopy.minute) + Math.floor(Number(timerCopy.second) / 60)
      );
      timerCopy.second = String(Number(timerCopy.second) % 60);

      timerCopy.hour = String(
        Number(timerCopy.hour) + Math.floor(Number(timerCopy.minute) / 60)
      );
      timerCopy.minute = String(Number(timerCopy.minute) % 60);

      return timerCopy;
    });
  };

  const handleTimerAction = () => {
    if (
      timer.hour.length === 0 ||
      timer.minute.length === 0 ||
      timer.second.length === 0
    ) {
      return;
    }
    setIsTimerRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current as number);
    setIsTimerRunning(false);
    setTimer({
      hour: "",
      minute: "",
      second: "",
    });
  };
  return (
    <StopWatchWrapper>
      <div style={{ display: "flex" }}>
        <TimerBlock
          onChange={(e) => handleChange(e, "hour")}
          type="number"
          placeholder="HH"
          value={timer.hour}
          disabled={isTimerRunning}
        />
        <TimerBlock
          onChange={(e) => handleChange(e, "minute")}
          type="number"
          placeholder="MM"
          value={timer.minute}
          disabled={isTimerRunning}
        />
        <TimerBlock
          onChange={(e) => handleChange(e, "second")}
          type="number"
          placeholder="ss"
          value={timer.second}
          disabled={isTimerRunning}
        />
      </div>
      <div style={{ display: "flex", marginTop: "25px" }}>
        <ActionBtn type="button" btnType="pause" onClick={handleTimerAction}>
          {isTimerRunning ? "Pause" : "Start"}
        </ActionBtn>
        <ActionBtn type="button" btnType="reset" onClick={handleReset}>
          Reset
        </ActionBtn>
      </div>
    </StopWatchWrapper>
  );
};

export default StopWatch;
