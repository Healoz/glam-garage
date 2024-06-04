import { useEffect, RefObject } from 'react';

const useClickOutside = (
    mainRef: RefObject<HTMLElement>,
    toggleState: boolean,
    setToggleState: (state: boolean) => void,
    additionalRefs: RefObject<HTMLElement>[]
  ) => {
    const handleClickOutside = (event: MouseEvent) => {
      // if clicked on any of the additional elements, do nothing
      if (
        additionalRefs.some((ref) =>
          ref.current?.contains(event.target as Node)
        )
      ) {
        return;
      }

      // if clicked inside the main element, do nothing
      if (mainRef.current?.contains(event.target as Node)) {
        return;
      }

      // hide the element if clicked outside
      setToggleState(false);
    };

    useEffect(() => {
      if (toggleState) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [toggleState]);
  };

  export default useClickOutside;