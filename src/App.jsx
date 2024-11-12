import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const favouriteList = JSON.parse(localStorage.getItem("favourites")) || [];
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(searchHistory);
    setFavourites(favouriteList);
  }, []);

  function onChangeSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function addSearchHistory(film) {
    const updatedHistory = [...searchHistory, film];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }

  function addFavourites(film) {
    if (favourites.includes(film)) {
      return;
    } else {
      const updatedFavourites = [...favourites, film];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchInput) {
      addSearchHistory(searchInput);
      setSearchInput(""); // Qidiruv maydonini tozalash
    }
  }

  return (
    <div className="container">
      <div className="container-app">
        <form className="container-form" onSubmit={handleSearch}>
          <input
            onChange={(e) => onChangeSearchInput(e)}
            value={searchInput}
            type="text"
            placeholder="write your movie"
            className="container-form__input"
          />
          <button className="container-form__button" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="container-movies">
          <div className="container-movie">
            <img src="https://s.yimg.com/ny/api/res/1.2/q0ErQBvK7BNm7VV7YKsDHA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTgwMTtoPTgwMQ--/https://media.zenfs.com/en-US/homerun/consequence_of_sound_458/14387e32fae84db6eda41900f9e6ddf2" alt="" />
            <div className="container-movie__content">
              <h1 className="movie-content__header">Jumanji 2</h1>
              <p className="movie-content__subtitle">
                Jumanji ikki bu judaham zo'r kino bo'lib ajoyib ishlanganligi boisdan bir baloku birbalo
              </p>
              <div className="movie-content__buttons">
                <button className="movie-content__button">Watch</button>
                <button className="movie-content__button" onClick={() => addFavourites("Jumanji 2")}>
                  <i className="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
