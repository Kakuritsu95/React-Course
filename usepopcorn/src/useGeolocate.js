import { useState, useEffect } from "react";
export function useGeolocate(countClicks) {
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    function getPos() {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          setPosition({ lat: latitude, lng: longitude });

          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
    // if (!navigator.geolocation) return;
    console.log(position);
    getPos();
  }, [countClicks]);
  return [position, isLoading, error];
}
