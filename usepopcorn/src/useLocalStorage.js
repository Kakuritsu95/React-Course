import { useEffect, useState } from "react";
export function useLocalStorage(initialValue, storageKey) {
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey) || initialValue);
  });
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  return [watched, setWatched];
}
