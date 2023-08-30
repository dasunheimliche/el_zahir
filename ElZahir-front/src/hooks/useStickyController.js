import { useEffect } from 'react';

export default function useStickyController(sticky, setSticky, mode) {
  function handleScroll() {
    if (mode === 'mobile') return;

    let threshold;

    if (window.innerWidth > 1600) {
      threshold = 62;
    } else if (window.innerWidth <= 1366) {
      threshold = 42;
    } else {
      threshold = 50;
    }

    if (window.scrollY >= threshold && !sticky) {
      setSticky(true);
    } else if (window.scrollY < threshold) {
      setSticky(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sticky]); //eslint-disable-line
}
