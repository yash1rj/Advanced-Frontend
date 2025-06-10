import styled from "styled-components";
import { TOAST_POSITIONS, ToastColors } from "./constants";
import { useEffect, useState } from "react";

const StyledToast = styled.div<{ toastType: string }>`
  display: flex;
  min-width: 180px;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-height: 35px;
  border-radius: 10px;
  position: absolute;
  color: black;
  padding: 5px 20px;
  background: ${(p) =>
    p.toastType ? ToastColors[p.toastType as keyof typeof ToastColors] : ""};

  &.top-right {
    top: 10px;
    right: 10px;
  }

  &.top-left {
    top: 10px;
    left: 10px;
  }

  &.bottom-right {
    bottom: 10px;
    right: 10px;
  }

  &.bottom-left {
    bottom: 10px;
    left: 10px;
  }

  .toast-close-btn {
    position: absolute;
    right: 8px;
    border: 0.1px solid black;
    padding: 1px 4px;
    border-radius: 50%;
  }
`;

export const useToast = (autoClose: boolean = true) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer: number;
    if (showToast && autoClose) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showToast, autoClose]);

  const toast = (
    toastType: string,
    toastMsg: string,
    toastPosition: string = TOAST_POSITIONS.TOPRIGHT
  ) => (
    <div>
      {showToast && (
        <StyledToast className={toastPosition} toastType={toastType}>
          <span style={{ marginRight: "20px" }}>{toastMsg}</span>
          <button
            className="toast-close-btn"
            type="button"
            onClick={() => setShowToast(false)}
          >
            X
          </button>
        </StyledToast>
      )}
    </div>
  );

  return {
    setShowToast,
    toast,
  };
};
