import React from "react";
import { useYoutubeMovieContext } from "../App";
import { GridView } from "./GridView";
import "../styles/displayMovies.css";
import { refreshLocalStorage } from "../utils/utilities";

interface DisplayMoviesProps {}

export const DisplayMovies: React.FC<DisplayMoviesProps> = () => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const handleWatch = () => {
    console.log("watch clicked");
  };

  const handleDelete = (id: string) => {
    if (movies !== undefined) {
      const result = movies?.findIndex((object) => object.id === id);
      movies.splice(result, 1);
      refreshLocalStorage(movies);
      setMovies(JSON.parse(localStorage.getItem('movies')!));
    }

    console.log("delete clicked" + id);
  };

  return (
    <div className="content">
      <h5>Your favourite videos</h5>
      <GridView
        movies={movies}
        handleWatch={handleWatch}
        handleDelete={handleDelete}
      />
    </div>
  );
};
