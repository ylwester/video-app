import React from "react";
import { useYoutubeMovieContext } from "../App";
import { GridView } from "./GridView";
import '../styles/displayMovies.css';

interface DisplayMoviesProps {}

export const DisplayMovies: React.FC<DisplayMoviesProps> = () => {
    const { movies } = useYoutubeMovieContext();
const handleWatch = () => {
    console.log('watch clicked');
}

const handleDelete = () => {
    console.log('delete clicked');
}

  return (
    <div className="content">
      <h5>Your favourite videos</h5>
      <GridView movies={movies} handleWatch={handleWatch} handleDelete={handleDelete} />
    </div>
  );
};

