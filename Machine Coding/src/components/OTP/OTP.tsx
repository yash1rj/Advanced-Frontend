import { useRef, useState } from "react";
import styled from "styled-components";

const PASS_KEY: string = "454566";

const OTPContainer = styled.div`
  display: flex;
  border: 4px solid coral;
  width: max-content;
`;

const OTPField = styled.input`
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 4px solid gold;
  width: 20px;
  justify-items: center;
  font-weight: bold;
  font-size: 20px;

  &:focus {
    border: 4px solid blue;
  }

  &.correct-otp-input {
    border: 4px solid limegreen;
  }

  &.wrong-otp-input {
    border: 4px solid red;
  }
`;

const OTPSubmit = styled.button`
  margin: 0 20px;
  height: 25px;
  align-self: center;
  border-radius: 10px;
`;

const OTP = ({ size = 6 }: { size?: number }) => {
  const [otpInputs, setOtpInputs] = useState(new Array(size).fill(""));
  const otpFieldRef = useRef<(HTMLInputElement | null)[]>([]);

  const otpFieldHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const otpInput = e.key;

    if (otpInput === "ArrowLeft") {
      if (idx > 0) otpFieldRef.current[idx - 1]?.focus();
      return;
    }
    if (otpInput === "ArrowRight") {
      if (idx + 1 < size) otpFieldRef.current[idx + 1]?.focus();
      return;
    }

    if (otpInput === "Backspace") {
      setOtpInputs((prevOtpInputs) => {
        const prevOtpInputCopy = [...prevOtpInputs];
        prevOtpInputCopy[idx] = "";
        return prevOtpInputCopy;
      });
      if (idx > 0) otpFieldRef.current[idx - 1]?.focus();
      return;
    }

    if (isNaN(Number(otpInput))) return;
    if (Number.isInteger(Number(otpInput))) {
      setOtpInputs((prevOtpInputs) => {
        const prevOtpInputCopy = [...prevOtpInputs];
        prevOtpInputCopy[idx] = otpInput;
        return prevOtpInputCopy;
      });
      if (idx + 1 < size) {
        otpFieldRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleCheckOTP = () => {
    otpFieldRef.current?.forEach((otpInput, idx) => {
      if (otpInput) {
        otpInput.classList.toggle(
          "correct-otp-input",
          otpInput.value === PASS_KEY[idx]
        );

        otpInput.classList.toggle(
          "wrong-otp-input",
          otpInput.value !== PASS_KEY[idx]
        );
      }
    });
  };

  return (
    <OTPContainer>
      {otpInputs?.map((digit, idx) => (
        <OTPField
          key={idx}
          ref={(currentInput) => {
            if (otpFieldRef.current) otpFieldRef.current[idx] = currentInput;
          }}
          type="text"
          value={digit}
          autoFocus={idx === 0}
          onKeyDown={(e) => otpFieldHandler(e, idx)}
        />
      ))}
      <OTPSubmit type="button" onClick={handleCheckOTP}>
        Check OTP
      </OTPSubmit>
    </OTPContainer>
  );
};

export default OTP;
