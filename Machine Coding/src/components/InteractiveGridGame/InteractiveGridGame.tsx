import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 18rem;
`;

const GridCell = styled.div<{ isActive: boolean }>`
  display: flex;
  background: ${(p) => (p.isActive ? "dodgerblue" : "black")};
  border: 1px solid white;
  height: 5rem;
  width: 5rem;
  margin: 4px;
`;

const InteractiveGridGame = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  );
  const queue = useRef<number[][]>([]);
  const timers = useRef<number[]>([]);

  const handleGridClick = (rowIdx: number, colIdx: number, flag: boolean) => {
    if ((grid[rowIdx][colIdx] || timers.current.length > 0) && flag) return;
    setGrid((prevGrid) => {
      const gridCopy = prevGrid.map((row) => [...row]);
      gridCopy[rowIdx][colIdx] = flag;
      return gridCopy;
    });
    if (flag) queue.current.push([rowIdx, colIdx]);
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], idx) => {
        timers.current[idx] = setTimeout(() => {
          handleGridClick(rowIdx, colIdx, false);
          if (idx === timers.current.length - 1) timers.current = [];
        }, 1000 * (idx + 1));
      });
      queue.current = [];
    }
  }, [grid]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  return (
    <GridContainer>
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => (
          <GridCell
            key={`${rowIdx}-${colIdx}`}
            isActive={cell}
            onClick={() => handleGridClick(rowIdx, colIdx, true)}
          ></GridCell>
        ));
      })}
    </GridContainer>
  );
};

export default InteractiveGridGame;
