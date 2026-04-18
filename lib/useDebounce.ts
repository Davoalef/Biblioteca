import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el timer si el valor cambia antes de que se cumpla el delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}