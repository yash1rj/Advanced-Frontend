import { ReactNode, useRef } from "react";
import Modal from "./Modal";
import { ModalProps } from "./types";

export const useModal = ({ title, content, actions }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
  };

  const modal: ReactNode = (
    <Modal
      ref={modalRef}
      title={title}
      content={content}
      actions={actions}
      onModalClose={closeModal}
    />
  );

  return {
    openModal,
    closeModal,
    modal,
  };
};
