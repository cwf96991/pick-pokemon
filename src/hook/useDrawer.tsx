import { useState } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    if (isOpen) {
      document.body.style.overflow = "unset";
    } else {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    }
    setIsOpen((prevState) => !prevState);
  };
  return { isOpen, toggleDrawer };
};
export default useDrawer;
