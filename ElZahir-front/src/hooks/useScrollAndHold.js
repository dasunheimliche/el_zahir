import { useState, useEffect } from 'react';


function useScrollAndHold() {
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    function handleTouchStart() {
      setIsMoving(true);
    }

    function handleTouchEnd() {
      setIsMoving(false);
    }

    function handleMotion(event) {
      if (event.acceleration.x !== null || event.acceleration.y !== null || event.acceleration.z !== null) {
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return isMoving;
  // const [isScrollingAndHolding, setIsScrollingAndHolding] = useState(false);

  // useEffect(() => {
  //   function handleTouchStart() {
  //     setIsScrollingAndHolding(true);
  //   }

  //   function handleTouchEnd() {
  //     setIsScrollingAndHolding(false);
  //   }

  //   function handleTouchMove() {
  //     if (isScrollingAndHolding) {
  //       setIsScrollingAndHolding(true);
  //     }
  //   }

  //   window.addEventListener('touchstart', handleTouchStart);
  //   window.addEventListener('touchend', handleTouchEnd);
  //   window.addEventListener('touchmove', handleTouchMove);

  //   return () => {
  //     window.removeEventListener('touchstart', handleTouchStart);
  //     window.removeEventListener('touchend', handleTouchEnd);
  //     window.removeEventListener('touchmove', handleTouchMove);

  //   };
  // }, [isScrollingAndHolding]);

  // return isScrollingAndHolding;
}

export default useScrollAndHold