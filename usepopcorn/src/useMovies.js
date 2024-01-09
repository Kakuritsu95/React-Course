import { useEffect, useState } from "react";
import { KEY } from "./KEY";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchDataFromAPI() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        if (data.Response === "False") throw new Error("Didnt find any movies");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchDataFromAPI();
    return () => controller.abort();
  }, [query]);
  return [movies, err, isLoading];
}
