import { useEffect, useState } from "react";
import {
  formatListItem,
  getSelectedItemCount,
  invertListItemSelection,
  invertListItemType,
} from "./helpers";
import styled from "styled-components";
import { List } from "./types";

const DEFAULT_LEFT_LIST = ["HTML", "CSS", "JavaScript", "TypeScript"];
const DEFAULT_RIGHT_LIST = ["React", "Angular", "VueJS", "NodeJS"];

const TransferListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid;
  margin-top: 50px;
`;

const ListSection = styled.section`
  article {
    padding: 10px;
  }
`;

const ButtonSection = styled.section`
  border: 1px solid;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    padding: 5px;
    margin: 5px;
  }
`;

const TransferList = () => {
  const [leftList, setLeftList] = useState<List>(
    formatListItem(DEFAULT_LEFT_LIST, false)
  );

  const [rightList, setRightList] = useState<List>(
    formatListItem(DEFAULT_RIGHT_LIST, true)
  );

  const [disableMover, setDisableMover] = useState({
    moveLeft: false,
    moveAllLeft: false,
    moveRight: false,
    moveAllRight: false,
  });

  useEffect(() => {
    const leftListSelectionCount = getSelectedItemCount(leftList);
    const rightListSelectionCount = getSelectedItemCount(rightList);

    setDisableMover((prevDisabledState) => ({
      ...prevDisabledState,
      moveAllRight: leftList.length === 0,
      moveRight: leftListSelectionCount === 0,
      moveLeft: rightListSelectionCount === 0,
      moveAllLeft: rightList.length === 0,
    }));
  }, [leftList, rightList]);

  const listItemSelectionHandler = (idx: number, listType: boolean) => {
    if (listType) {
      setRightList((prevRightList) =>
        invertListItemSelection(prevRightList, idx)
      );
    } else {
      setLeftList((prevLeftList) => invertListItemSelection(prevLeftList, idx));
    }
  };

  const handleMoveItems = (listType: boolean, allSelection: boolean) => {
    if (listType) {
      const rightListCopy = invertListItemType(rightList);
      if (allSelection) {
        setRightList([]);
        setLeftList((prevLeftList) => [...prevLeftList, ...rightListCopy]);
      } else {
        const filteredRightList = rightListCopy?.filter(
          (listItem) => listItem.isSelected
        );
        setRightList((prevRightList) =>
          prevRightList?.filter((listItem) => !listItem.isSelected)
        );
        setLeftList((prevLeftList) => [...prevLeftList, ...filteredRightList]);
      }
    } else {
      const leftListCopy = invertListItemType(leftList);
      if (allSelection) {
        setLeftList([]);
        setRightList((prevRightList) => [...prevRightList, ...leftListCopy]);
      } else {
        const filteredLeftList = leftListCopy?.filter(
          (listItem) => listItem.isSelected
        );
        setLeftList((prevLeftList) =>
          prevLeftList?.filter((listItem) => !listItem.isSelected)
        );
        setRightList((prevRightList) => [
          ...prevRightList,
          ...filteredLeftList,
        ]);
      }
    }
  };

  return (
    <TransferListContainer>
      <ListSection>
        {leftList?.map((leftListItem, idx) => (
          <article key={idx}>
            <input
              id={`${leftListItem}_${idx}`}
              type="checkbox"
              checked={leftListItem.isSelected}
              onChange={() => listItemSelectionHandler(idx, false)}
            />
            <label htmlFor={`${leftListItem}_${idx}`}>
              {leftListItem.value}
            </label>
          </article>
        ))}
      </ListSection>
      <ButtonSection>
        <button
          type="button"
          disabled={disableMover.moveAllRight}
          onClick={() => handleMoveItems(false, true)}
        >
          &gt;&gt;
        </button>
        <button
          type="button"
          disabled={disableMover.moveRight}
          onClick={() => handleMoveItems(false, false)}
        >
          &gt;
        </button>
        <button
          type="button"
          disabled={disableMover.moveLeft}
          onClick={() => handleMoveItems(true, false)}
        >
          &lt;
        </button>
        <button
          type="button"
          disabled={disableMover.moveAllLeft}
          onClick={() => handleMoveItems(true, true)}
        >
          &lt;&lt;
        </button>
      </ButtonSection>
      <ListSection>
        {rightList?.map((rightListItem, idx) => (
          <article key={idx}>
            <input
              id={`${rightListItem}_${idx}`}
              type="checkbox"
              checked={rightListItem.isSelected}
              onChange={() => listItemSelectionHandler(idx, true)}
            />
            <label htmlFor={`${rightListItem}_${idx}`}>
              {rightListItem.value}
            </label>
          </article>
        ))}
      </ListSection>
    </TransferListContainer>
  );
};

export default TransferList;
