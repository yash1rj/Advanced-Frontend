import { useEffect, useRef, useState } from "react";
import { fetchImagesList } from "../../api/fetchImages";
import styled from "styled-components";

type ImageData = {
  id: string;
  download_url: string;
  author: string;
};

const ImageContainer = styled.div`
  display: flex;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 80vh;
`;

const TraversalButton = styled.button<{ dir: string }>`
  position: absolute;
  top: 50%;
  border-radius: 10px;
  background: purple;
  color: white;
  font-weight: bold;
  ${(p) => p.dir === "left" && `left: 2em;`};
  ${(p) => p.dir === "right" && `right: 2em;`};
`;

const Carousel = () => {
  const [imageList, setImageList] = useState<ImageData[]>([]);
  const [activeImage, setActiveImage] = useState<number>(0);
  let timerRef = useRef<number>(0);

  const fetchImageData = async () => {
    try {
      const results = await fetchImagesList();
      setImageList(results);
    } catch (error) {
      setImageList([]);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleImageChange("right");
    }, 4500);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleImageChange = (direction: string) => {
    if (direction === "left") {
      setActiveImage((prevImageIdx) =>
        prevImageIdx === 0 ? imageList?.length - 1 : prevImageIdx - 1
      );
    } else {
      setActiveImage((prevImageIdx) =>
        prevImageIdx === imageList?.length - 1 ? 0 : prevImageIdx + 1
      );
    }
  };

  return (
    <ImageContainer
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() =>
        (timerRef.current = setInterval(() => handleImageChange("right"), 4500))
      }
    >
      <TraversalButton
        dir="left"
        type="button"
        onClick={() => handleImageChange("left")}
      >
        &lt;
      </TraversalButton>
      {imageList?.map((image, idx) => (
        <>
          {activeImage === idx && (
            <CarouselImage
              key={image.id}
              src={image.download_url}
              loading="lazy"
              alt={`Captured by ${image.author}`}
            />
          )}
        </>
      ))}
      <TraversalButton
        dir="right"
        type="button"
        onClick={() => handleImageChange("right")}
      >
        &gt;
      </TraversalButton>
    </ImageContainer>
  );
};

export default Carousel;
