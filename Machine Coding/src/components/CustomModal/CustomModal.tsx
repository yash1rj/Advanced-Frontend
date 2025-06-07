import styled from "styled-components";
import { useModal } from "../../hooks/useModal/useModal";

const CustomButton = styled.button`
  background: darkslateblue;
  color: white;
  padding: 5px;
  border-radius: 5px;
`;

const CustomModal = () => {
  const { modal, openModal } = useModal({
    title: {
      heading: "New Modal",
      subHeading: "Custom modal component",
    },
    content: <p>Content</p>,
    actions: <button type="button">Action</button>,
  });
  return (
    <>
      <CustomButton type="button" onClick={openModal}>
        Open Modal
      </CustomButton>
      {modal}
    </>
  );
};

export default CustomModal;
