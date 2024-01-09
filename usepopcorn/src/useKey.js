import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener(key, action);
  }, [key, action]);
}
