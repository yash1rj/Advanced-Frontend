import { useState } from "react";
import styled from "styled-components";

type ToDoItem = {
  id: number;
  done: boolean;
  msg: string;
};

const ToDoListContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: indianred;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const AddToDoSection = styled.section`
  display: flex;
  margin: 20px;

  input {
    min-width: 250px;
    height: 50px;
    border-radius: 5px;
  }

  button {
    margin-left: 20px;
    display: flex;
    height: max-content;
    padding: 16px 10px;
    align-self: center;
    border-radius: 50%;
  }
`;

const ToDoListSection = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 25em;
  padding: 0;

  article {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0;
    border: 1px solid beige;
    border-radius: 5px;
    padding: 5px;

    button {
      border-radius: 5px;
      background: aquamarine;
    }
  }
`;

const ToDoList = () => {
  const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
  const [toDo, setToDo] = useState<string>("");

  const addToListHandler = () => {
    const isToDoAlreadyAdded = toDoList?.findIndex(
      (toDoItem) => toDoItem.msg === toDo
    );
    if (toDo.length > 0 && isToDoAlreadyAdded === -1) {
      setToDoList((prevList) => [
        ...prevList,
        {
          id: prevList.length + 1,
          done: false,
          msg: toDo,
        },
      ]);

      setToDo("");
    }
  };

  const taskDoneHandler = (toDoId: number) => {
    const targetToDo = toDoList?.findIndex(
      (toDoItem) => toDoItem.id === toDoId
    );

    if (targetToDo !== -1)
      setToDoList((prevList) => {
        const prevListCopy = [...prevList];
        prevListCopy[targetToDo] = {
          ...prevList[targetToDo],
          done: !prevList[targetToDo].done,
        };
        return prevListCopy;
      });
  };

  const removeFromListHandler = (toDoId: number) => {
    const targetToDoIndex = toDoList?.findIndex((toDo) => toDo.id === toDoId);
    setToDoList((prevList) => [
      ...prevList.slice(0, targetToDoIndex),
      ...prevList.slice(targetToDoIndex + 1),
    ]);
  };

  return (
    <ToDoListContainer>
      <AddToDoSection>
        <input
          type="text"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" ? addToListHandler() : undefined
          }
        />
        <button onClick={addToListHandler}>Add To-Do</button>
      </AddToDoSection>
      <ToDoListSection>
        {toDoList?.map((toDoItem) => (
          <article>
            <span>
              <input
                type="checkbox"
                onChange={() => taskDoneHandler(toDoItem.id)}
                checked={toDoItem.done}
              />
              <span
                style={{ textDecoration: toDoItem.done ? "line-through" : "" }}
              >
                {toDoItem.msg}
              </span>
            </span>
            <button onClick={() => removeFromListHandler(toDoItem.id)}>
              X
            </button>
          </article>
        ))}
      </ToDoListSection>
    </ToDoListContainer>
  );
};

export default ToDoList;
