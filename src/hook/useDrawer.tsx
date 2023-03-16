import { useState } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    // Toggle the drawer open/closed
    setIsOpen((prevState) => !prevState);

    // If the drawer is being opened, disable scrolling on the body
    if (!isOpen) {
      const body = document.body;
      const overflow = "hidden";
      if (typeof window !== "undefined") {
        body.style.overflow = overflow;
      }
    } else {
      // If the drawer is being closed, re-enable scrolling on the body
      const body = document.body;
      const overflow = "unset";
      if (typeof window !== "undefined") {
        body.style.overflow = overflow;
      }
    }
  };
  return { isOpen, toggleDrawer };
};
export default useDrawer;
