import {
  useCallback,
  useReducer,
  useEffect,
  useContext,
  createContext,
} from "react";

const inititalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "fetch cities":
      return { ...state, isLoading: false, cities: action.payload };
    case "get current city":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "add city":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "delete city":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "toggle loading":
      return { ...state, isLoading: true };

    default:
      throw new Error("there isnt such action");
  }
}
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    inititalState
  );
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "toggle loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "fetch cities", payload: data });
      } catch {
        alert("there was an error loading data...");
      } finally {
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "toggle loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "get current city", payload: data });
      } catch {
        alert("there was an error loading data...");
      } finally {
      }
    },
    [currentCity.id]
  );

  async function handleAddCity(newCity) {
    try {
      dispatch({ type: "toggle loading" });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "add city", payload: data });
    } catch {
      alert("there was an error creating the city...");
    } finally {
    }
  }
  async function handleDeleteCity(id) {
    try {
      dispatch({ type: "toggle loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // const data = await res.json();
      dispatch({ type: "delete city", payload: id });
    } catch {
      alert("there was an error deleting the city...");
    } finally {
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        handleAddCity,
        handleDeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "useCities consumer cant have access outside of it's provider (CitiesProvider)"
    );
  return context;
}
export { CitiesProvider, useCities };
