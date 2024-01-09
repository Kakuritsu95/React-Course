import { useState, useEffect } from "react";

export function useFetchLocationAndWeather(query) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (query.length < 2) return;
    async function fetcher() {
      setIsLoading(true);
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        );
        const geoLoc = await geoRes.json();

        const { latitude, longitude, timezone, name, country_code } =
          geoLoc.results.at(0);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weather = await weatherRes.json();
        setWeatherData(weather);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  }, [query]);
  return [weatherData, isLoading];
}
