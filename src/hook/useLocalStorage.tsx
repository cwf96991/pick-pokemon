import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Failed to load item from localStorage", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save item to localStorage", error);
    }
  }, [key, value]);

  function getItem(): Promise<T> {
    return Promise.resolve(value);
  }

  function setItem(newValue: T): void {
    setValue(newValue);
  }

  function removeItem(): void {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }

  return { getItem, setItem, removeItem };
}

export default useLocalStorage;


