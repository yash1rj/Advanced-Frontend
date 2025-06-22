import styled from "styled-components";
import { ImageData } from "../../api/api_types";
import { useRef } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostImage = styled.img`
  width: 400px;
  height: 350px;
  border: 1px solid gold;
  border-radius: 10px;
  margin: 10px;
`;

const LoadingIndicator = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #666;
`;

const Posts = ({
  imageList,
  isLoading,
  hasMore,
  handleLoadMore,
}: {
  imageList: ImageData[];
  isLoading: boolean;
  hasMore: boolean;
  handleLoadMore: () => void;
}) => {
  const lastImage = useRef(null);

  useInfiniteScroll(lastImage, { threshold: 0.8 }, handleLoadMore);

  return (
    <ImageContainer>
      {imageList?.map((image, idx) => (
        <PostImage
          ref={idx === imageList.length - 1 ? lastImage : undefined}
          key={image.id}
          src={image.download_url}
          loading="lazy"
          alt={`Captured by ${image.author}`}
        />
      ))}
      {isLoading && <LoadingIndicator>Loading more images...</LoadingIndicator>}
      {!hasMore && imageList.length > 0 && (
        <LoadingIndicator>No more images to load</LoadingIndicator>
      )}
    </ImageContainer>
  );
};

export default Posts;
