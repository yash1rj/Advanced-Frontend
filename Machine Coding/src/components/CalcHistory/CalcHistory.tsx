import { useState } from "react";
import styled from "styled-components";

type CalcHistory = {
  operation: string;
  before: number;
  after: number;
}[];

const Container = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
`;

const OperationSection = styled.section`
  display: flex;
  margin: 20px;
`;

const ResultSection = styled.section`
  display: flex;
  margin: 20px;
  border: 2px solid cornflowerblue;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  min-width: max-content;
`;

const HistorySection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 2px solid gold;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  min-width: 300px;
  min-height: 100px;
  color: gold;
  max-height: 250px;
  overflow-y: auto;

  h3 {
    display: flex;
    min-width: inherit;
    justify-content: center;
    margin-top: 5px;
    border-bottom: 1px solid gold;
    padding-bottom: 5px;
  }
`;

const CalculationBtn = styled.button<{ type?: string }>`
  width: 60px;
  padding: 10px;
  margin: 10px;
  background: ${(p) =>
    p.type === "inc" ? "green" : p.type === "dec" ? "red" : "purple"};
  color: white;
  font-weight: bold;
  border-radius: 15px;

  &:disabled {
    background: grey;
  }
`;

const decrementOperations = [-100, -10, -1];
const incrementOperations = [1, 10, 100];

const CalcHistory = () => {
  const [calculationResult, setCalculationResult] = useState(0);
  const [calculationHistory, setCalculationHistory] = useState<CalcHistory>([]);
  const [redoHistory, setRedoHistory] = useState<CalcHistory>([]);

  const calcOperate = (option: number) => {
    let prev = 0;
    let next = 0;

    setCalculationResult((prevResult) => {
      prev = prevResult;
      next = prevResult + option;
      return next;
    });

    setCalculationHistory((prevHistory) => [
      {
        operation: option < 0 ? String(option) : String("+" + option),
        before: prev,
        after: next,
      },
      ...prevHistory,
    ]);
  };

  const handleUndo = () => {
    let redo: CalcHistory[0];
    setCalculationHistory((prevHistory) => {
      let [first, ...rest] = [...prevHistory];
      redo = first;
      return [...rest];
    });
    setRedoHistory((prevRedoHistory) => [redo, ...prevRedoHistory]);
  };
  const handleRedo = () => {
    let latestRedo: CalcHistory[0];
    setRedoHistory((prevRedoHistory) => {
      let [first, ...rest] = [...prevRedoHistory];
      latestRedo = first;
      return [...rest];
    });
    setCalculationHistory((prevHistory) => [latestRedo, ...prevHistory]);
  };

  return (
    <>
      <Container>
        <OperationSection>
          {decrementOperations.map((option) => (
            <CalculationBtn type="dec" onClick={() => calcOperate(option)}>
              {option}
            </CalculationBtn>
          ))}
        </OperationSection>
        <ResultSection>{calculationResult}</ResultSection>
        <OperationSection>
          {incrementOperations.map((option) => (
            <CalculationBtn type="inc" onClick={() => calcOperate(option)}>
              +{option}
            </CalculationBtn>
          ))}
        </OperationSection>
      </Container>
      <Container>
        <OperationSection>
          <CalculationBtn
            onClick={handleUndo}
            disabled={calculationHistory.length === 0}
          >
            Undo
          </CalculationBtn>
          <CalculationBtn
            onClick={handleRedo}
            disabled={redoHistory.length === 0}
          >
            Redo
          </CalculationBtn>
        </OperationSection>
      </Container>
      <Container>
        <HistorySection>
          <h3>History</h3>
          {calculationHistory.length > 0 &&
            calculationHistory.map((history) => (
              <article>
                <span style={{ marginRight: "10px" }}>
                  Operation : {history.operation} {"==>"}
                </span>
                <span>
                  {"["} {history.before} {"--->"}{" "}
                </span>
                <span>
                  {history.after} {"]"}
                </span>
              </article>
            ))}
          {calculationHistory.length === 0 && (
            <article>No calculations done yet !!</article>
          )}
        </HistorySection>
      </Container>
    </>
  );
};

export default CalcHistory;
