import { useState, useEffect } from 'react';

function useTouchScroll() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer = null;

    const handleTouchStart = () => setIsScrolling(true);
    const handleTouchEnd = () => setIsScrolling(false);
    const handleScroll = () => {
      clearTimeout(timer);
      setIsScrolling(true);
      timer = setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return isScrolling;
}

export default useTouchScroll;

// import { useState, useEffect } from 'react';

// function useScrollAndHold() {
//   const [isScrollingAndHolding, setIsScrollingAndHolding] = useState(false);

//   useEffect(() => {
//     function handleTouchStart() {
//       setIsScrollingAndHolding(true);
//     }

//     function handleTouchEnd() {
//       setIsScrollingAndHolding(false);
//     }

//     function handleTouchMove() {
//       if (isScrollingAndHolding) {
//         setIsScrollingAndHolding(true);
//       }
//     }

//     window.addEventListener('touchstart', handleTouchStart);
//     window.addEventListener('touchend', handleTouchEnd);
//     window.addEventListener('touchmove', handleTouchMove);

//     return () => {
//       window.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('touchend', handleTouchEnd);
//       window.removeEventListener('touchmove', handleTouchMove);
//     };
//   }, [isScrollingAndHolding]);

//   return isScrollingAndHolding;
// }

// export default useScrollAndHold