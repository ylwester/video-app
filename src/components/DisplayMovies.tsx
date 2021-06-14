import React from "react";
import { useYoutubeMovieContext } from "../App";
import { MovieCard } from "./MovieCard";
import '../styles/displayMovies.css';

interface DisplayMoviesProps {}

export const DisplayMovies: React.FC<DisplayMoviesProps> = () => {
  const { movies } = useYoutubeMovieContext();
  return (
    <div className="movies-container">
      <h5>Your favourite videos</h5>
      <div className="movies-container">
          {
              movies?.length !== 0 ? movies?.map(movie => (
                    <MovieCard movie={movie} />
               )) : null
          }
      </div>
    </div>
  );
};
