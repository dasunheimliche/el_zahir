import { useState, useEffect } from 'react';

function useInnerHeight() {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return innerHeight;
}

export default useInnerHeight;
