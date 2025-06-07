import { forwardRef } from "react";
import styled from "styled-components";
import { ModalProps } from "./types";

const ModalDialog = styled.dialog`
  padding: 0;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px grey;
  position: relative;

  button#close {
    position: absolute;
    right: 3px;
    top: 3px;
    border-radius: 30%;
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ModalContainer = styled.div`
  min-height: 50vh;
  min-width: 50vw;
  padding: 20px;
  height: 50vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  color: black;
`;

const ModalHeader = styled.header`
  h1 {
    margin: 0;
  }

  h3 {
    margin: 5px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid grey;
  }
`;

const ModalContent = styled.main``;

const ModalFooter = styled.footer`
  padding-top: 10px;
  border-top: 1px solid grey;
`;

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ title, content, actions, onModalClose }, ref) => {
    return (
      <ModalDialog
        onClick={(e) =>
          e.target === e.currentTarget && onModalClose && onModalClose()
        }
        ref={ref}
      >
        <button id="close" onClick={onModalClose}>
          X
        </button>
        <ModalContainer>
          <ModalHeader>
            <h1>{title.heading}</h1>
            <h3>{title.subHeading}</h3>
          </ModalHeader>
          <ModalContent>{content}</ModalContent>
          <ModalFooter>{actions}</ModalFooter>
        </ModalContainer>
      </ModalDialog>
    );
  }
);

export default Modal;
