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
  const handlePause = () => {};
  const handleReset = () => {};
  return (
    <StopWatchWrapper>
      <div style={{ display: "flex" }}>
        <TimerBlock type="number" placeholder="HH" />
        <TimerBlock type="number" placeholder="MM" />
        <TimerBlock type="number" placeholder="ss" />
      </div>
      <div style={{ display: "flex", marginTop: "25px" }}>
        <ActionBtn type="button" btnType="pause" onClick={handlePause}>
          Pause
        </ActionBtn>
        <ActionBtn type="button" btnType="reset" onClick={handleReset}>
          Reset
        </ActionBtn>
      </div>
    </StopWatchWrapper>
  );
};

export default StopWatch;
