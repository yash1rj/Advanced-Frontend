import { useCallback, useEffect, useState } from "react";
import Posts from "./Posts";
import { fetchImagesList } from "../../api/fetchImages";
import { ImageData } from "../../api/api_types";

const InfiniteScroll = () => {
  const [imageList, setImageList] = useState<ImageData[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchImageData = useCallback(async () => {
    if (isLoading || !hasMore) return; // Prevent multiple calls
    setIsLoading(true);
    try {
      const results = await fetchImagesList(pageNum, 3);

      if (results.length === 0) {
        setHasMore(false);
      } else {
        setImageList((prevResult) => [...prevResult, ...results]);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImageList([]);
    } finally {
      setIsLoading(false);
    }
  }, [pageNum]);

  useEffect(() => {
    fetchImageData();
  }, [fetchImageData]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  }, [isLoading, hasMore]);

  return (
    <Posts
      imageList={imageList}
      isLoading={isLoading}
      hasMore={hasMore}
      handleLoadMore={handleLoadMore}
    />
  );
};

export default InfiniteScroll;
