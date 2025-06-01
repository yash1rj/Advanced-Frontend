import { useState } from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  justify-self: center;
  border: 1px solid gold;
  border-radius: 5px;
  width: max-content;
  padding: 15px;
`;

const StarShape = styled.div<{ fixedbg: boolean; hoverBg: boolean }>`
  width: 80px;
  aspect-ratio: 1;
  clip-path: polygon(50% 0, 79% 90%, 2% 35%, 98% 35%, 21% 90%);
  background: ${(props) => (props.fixedbg || props.hoverBg ? "gold" : "white")};

  ${(props) =>
    !props.fixedbg &&
    `
        &:hover {
            background: ${props.hoverBg ? "gold" : "white"};
        }
    `}
`;

const Rating = ({ totalRating = 5 }: { totalRating?: number }) => {
  const [stars, setStars] = useState<boolean[]>(
    new Array(totalRating).fill(false)
  );
  const [starIndex, setStarIndex] = useState(-1);

  const handleSaveRating = (index: number) => {
    setStars((prevStars) => [
      ...prevStars.fill(true, 0, index + 1).fill(false, index + 1),
    ]);
  };

  return (
    <RatingContainer>
      {stars?.map((star, index) => (
        <StarShape
          key={index}
          fixedbg={star}
          hoverBg={starIndex >= index}
          onMouseEnter={() => setStarIndex(index)}
          onMouseLeave={() => setStarIndex(-1)}
          onClick={() => handleSaveRating(index)}
        />
      ))}
    </RatingContainer>
  );
};

export default Rating;
