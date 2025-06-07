import { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  background: white;
  position: relative;
  width: 500px;
  height: 30px;
`;
const ProgressBarLoader = styled.div<{ progress: number }>`
  background: green;
  height: 30px;
  transition: all 1s ease-out;
  width: ${(p) => (p.progress ? `${p.progress}%` : "")};

  span {
    color: black;
    left: 47%;
    margin: 5px 0;
    position: absolute;
    width: max-content;
  }
`;

const ProgressBar = () => {
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    let interval: number;
    interval = setInterval(() => {
      setProgressState((prevProgress) => {
        if (prevProgress === 100) {
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <ProgressBarContainer>
        <ProgressBarLoader progress={progressState}>
          <span>{progressState}%</span>
        </ProgressBarLoader>
      </ProgressBarContainer>
      <button
        style={{ marginTop: "15px" }}
        type="button"
        onClick={() => setProgressState(0)}
      >
        Reset Progress
      </button>
    </>
  );
};

export default ProgressBar;
