import styled from "styled-components";
import {
  TOAST_POSITIONS,
  TOAST_TYPES,
  ToastColors,
} from "../../hooks/useToast/constants";
import { useToast } from "../../hooks/useToast/useToast";
import { useState } from "react";

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

const ToastTrigger = styled.button<{ toastType: string }>`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background: ${(p) =>
    p.toastType ? ToastColors[p.toastType as keyof typeof ToastColors] : ""};
`;

const ToastContainer = () => {
  const [activeToast, setActiveToast] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const { setShowToast, toast } = useToast();

  const triggerToast = (toastType: string, toastMsg: string) => {
    setActiveToast(toastType);
    setToastMsg(toastMsg);
    setShowToast(true);
  };

  return (
    <>
      <ButtonSection>
        <ToastTrigger
          type="button"
          toastType={TOAST_TYPES.SUCCESS}
          onClick={() =>
            triggerToast(TOAST_TYPES.SUCCESS, "This is success msg !")
          }
        >
          Success Toast
        </ToastTrigger>
        <ToastTrigger
          type="button"
          toastType={TOAST_TYPES.FAILURE}
          onClick={() =>
            triggerToast(TOAST_TYPES.FAILURE, "This is failed msg !")
          }
        >
          Failure Toast
        </ToastTrigger>
        <ToastTrigger
          type="button"
          toastType={TOAST_TYPES.INFO}
          onClick={() => triggerToast(TOAST_TYPES.INFO, "This is info msg !")}
        >
          Info Toast
        </ToastTrigger>
        <ToastTrigger
          type="button"
          toastType={TOAST_TYPES.WARNING}
          onClick={() =>
            triggerToast(TOAST_TYPES.WARNING, "This is warning msg !")
          }
        >
          Warning Toast
        </ToastTrigger>
      </ButtonSection>
      {toast(activeToast, toastMsg, TOAST_POSITIONS.BOTTOMRIGHT)}
    </>
  );
};

export default ToastContainer;
