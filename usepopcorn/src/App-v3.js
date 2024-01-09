import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMovies } from "./useMovies";
import { useKey } from "./useKey";
import StarRating from "./StarRating";
import { KEY } from "./KEY";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [movies, err, isLoading] = useMovies(query);
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setError] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState(null);
  function handleSelectedTitleId(id) {
    if (id === selectedTitleId) handleRemoveSelectedTitleId();
    else setSelectedTitleId(id);
  }
  function handleRemoveSelectedTitleId() {
    setSelectedTitleId(null);
  }
  function addMovieToWatchedList(selectedMovie) {
    if (watched.some((movie) => movie.imdbID === selectedMovie.imdbID)) {
      setWatched((movies) => {
        return [
          ...movies.filter((movie) => movie.imdbID !== selectedMovie.imdbID),
          selectedMovie,
        ];
      });

      handleRemoveSelectedTitleId();
      return;
    }
    setWatched((movies) => [...movies, { ...selectedMovie }]);

    // localStorage.setItem(
    //   "watched",
    //   JSON.stringify([...watched, selectedMovie])
    // );
    handleRemoveSelectedTitleId();
  }
  function handleRemoveMovieFromWatchedList(selecetedMovie) {
    setWatched((movies) =>
      movies.filter((movie) => movie.imdbID !== selecetedMovie.imdbID)
    );
  }

  // FETCHING DATA WITH USE EFFECT

  // FETCHING DATA WITH REGULAR EVENT LISTENER EVENT
  // function fetchDataFromAPI(query) {
  //   const controller = new AbortController();
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       setError("");
  //       const res = await fetch(
  //         `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
  //         { signal: controller.signal }
  //       );

  //       const data = await res.json();
  //       if (data.Response === "False") throw new Error("Didnt find any movies");
  //       setMovies(data.Search);
  //       setError("");
  //     } catch (error) {
  //       if (!controller.signal.aborted) setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }
  //   }
  //   handleRemoveSelectedTitleId();
  //   fetchData();
  //   return controller.abort();
  // }

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResaults movies={movies} />
      </NavBar>
      <Main>
        {err ? (
          <ErrorMessage message={err} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <Box selectedTitleId={selectedTitleId}>
            <MovieList
              movies={movies}
              selectedTitleId={selectedTitleId}
              onSelectTitleId={handleSelectedTitleId}
              onRemoveSelectedTitleId={handleRemoveSelectedTitleId}
            ></MovieList>
          </Box>
        )}

        <Box>
          {selectedTitleId ? (
            <MovieDetails
              selectedTitleId={selectedTitleId}
              onRemoveSelectedTitleId={handleRemoveSelectedTitleId}
              onAddMovieToWatchedList={addMovieToWatchedList}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onRemoveMovieFromWatchedList={handleRemoveMovieFromWatchedList}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);
  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}
function NumResaults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({
  movies,
  onSelectTitleId,
  onRemoveSelectedTitleId,
  selectedTitleId,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          onSelectTitleId={onSelectTitleId}
          onRemoveSelectedTitleId={onRemoveSelectedTitleId}
          movie={movie}
          selectedTitleId={selectedTitleId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectTitleId }) {
  return (
    <li
      onClick={() => {
        onSelectTitleId(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieDetails({
  selectedTitleId,
  onRemoveSelectedTitleId,
  onAddMovieToWatchedList,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const refValue = useRef(0);
  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (userRating) refValue.current += 1;
  }, [userRating]);
  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedTitleId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    fetchMovieDetails();
  }, [selectedTitleId]);
  useKey("escape", onRemoveSelectedTitleId);
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => (document.title = "usePopcorn");
  }, [title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onRemoveSelectedTitleId}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating ? (
                <button
                  onClick={() => {
                    onAddMovieToWatchedList({
                      imdbID,
                      title,
                      year,
                      poster,
                      runtime: Number(runtime.slice(0, 3)),
                      imdbRating: Number(imdbRating),
                      plot,
                      released,
                      actors,
                      director,
                      genre,
                      userRating: userRating,
                      timesUserChangedRating: refValue.current,
                    });
                  }}
                  className="btn-add"
                >
                  {" "}
                  + Add to list{" "}
                </button>
              ) : null}
            </div>
            <div>
              <em>{plot}</em>
              <p>Starring {actors} </p>
              <p>Directed by {director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
function WatchedList({ watched, onRemoveMovieFromWatchedList }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies
          key={movie.imdbID}
          movie={movie}
          onRemoveMovieFromWatchedList={onRemoveMovieFromWatchedList}
        />
      ))}
    </ul>
  );
}
function WatchedMovies({ movie, onRemoveMovieFromWatchedList }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => onRemoveMovieFromWatchedList(movie)}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed()} min</span>
        </p>
      </div>
    </div>
  );
}
