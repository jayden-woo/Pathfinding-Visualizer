import { useEffect, useState } from "react";

// Function to limit number of executions of the function for each unit of time given
const debounce = (func, time) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout((...args) => {
      timer = null;
      func(...args);
    }, time);
  };
};

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const debouncedHandleResize = debounce(() => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    // Add event listener
    window.addEventListener("resize", debouncedHandleResize);

    // Call handler right away so state gets updated with initial window size
    debouncedHandleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
    // Empty array ensures that effect is only run on mount
  }, []);

  return windowSize;
};

export default useWindowSize;
