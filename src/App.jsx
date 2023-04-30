import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search";

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("fast and furious");
  const [submit, setSubmit] = useState(true);
  const key = "362f25e0eba3239166fd3a8ceb515a21";

  useEffect(() => {
    if (submit) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=1&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data.results.slice(0, 8)))
        .catch((err) => console.log(err));
    }
  }, [search, submit, key]);


  console.log(movie);

  useEffect(() => {
    if (submit) {
      setSubmit(false);
    }
  }, [submit]);

  let getMovies = movie.map((item) => {
    return (
      <div className="movie-items" key={item.id}>
        <img
          className="movie-poster"
          src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={item.original_title}
        />
        <p className="title">{item.original_title}</p>
        <p className="title">{item.release_date}</p>
        <p className="overview">{item.overview}</p>
      </div>
    );
  });

  async function handleSubmit(e, value, setValue) {
    e.preventDefault();
    setSearch(value);
    setSubmit(true);
    await (setValue(''))
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="app">
      <Search change={handleChange} submit={handleSubmit} value={search} />
      {movie.length > 0 ? (
        <div className="movies">{getMovies}</div>
      ) : (
        <p>Movie not found in the database at the moment</p>
      )}
    </div>
  );
}

export default App;
