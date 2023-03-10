import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function loadLocalDarkMode() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }
  useEffect(() => {
    loadLocalDarkMode();
    window.addEventListener("modeChanged", () => {
      loadLocalDarkMode();
    });
    return () => window.removeEventListener("modeChanged", loadLocalDarkMode);
  }, []);
  const toggleDarkModeHandler = () => {
    if (isDarkMode) {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
    setIsDarkMode(!isDarkMode);
    localStorage.theme = !isDarkMode ? "dark" : "light";
    window.dispatchEvent(new Event("modeChanged"));
  };
  return { isDarkMode, toggleDarkModeHandler };
};

export default useDarkMode;
