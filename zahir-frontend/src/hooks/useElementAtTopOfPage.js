import { useState, useEffect, useRef } from 'react';

function useIsElementInViewport(ref, parentRef) {
  const [isInside, setIsInside] = useState(true);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsInside(false);
        } else {
          setIsInside(true);
        }
      });
    })
  );

  useEffect(() => {
    const element = ref.current;
    const observerInstance = observer.current;

    observerInstance.observe(element);

    return () => observerInstance.unobserve(element);
  }, [ref, observer]);

  useEffect(() => {
    const parent = parentRef.current;
    const observerInstance = observer.current;

    observerInstance.observe(parent);

    return () => observerInstance.unobserve(parent);
  }, [parentRef, observer]);

  return isInside;
}

export default useIsElementInViewport;
