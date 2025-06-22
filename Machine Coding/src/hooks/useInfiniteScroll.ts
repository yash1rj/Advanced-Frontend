import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  targetRef: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {},
  onIntersection: () => void
) => {
  // Define a ref to store the IntersectionObserver instance
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Call the provided callback function
          onIntersection();
        }
      });
    },
    [onIntersection]
  );

  useEffect(() => {
    if (targetRef.current) {
      // Create a new IntersectionObserver instance
      observer.current = new IntersectionObserver(handleIntersection, options);
      // Start observing the target element
      observer.current.observe(targetRef.current);
    }

    // Clean up when the component unmounts
    return () => {
      if (observer.current) {
        if (targetRef.current) {
          observer.current.unobserve(targetRef.current);
        }
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [handleIntersection, targetRef]);
};
