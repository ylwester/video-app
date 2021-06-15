import React, { useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { GridView } from "./GridView";
import "../styles/displayMovies.css";
import { refreshLocalStorage } from "../utils/utilities";
import { ModalVideo } from "./ModalVideo";

interface DisplayMoviesProps {}

export const DisplayMovies: React.FC<DisplayMoviesProps> = () => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const [modal, setModal] = useState(false);
const [videoId, setVideoId] = useState<string>();
  const toggle = () => setModal(!modal);


  const handleWatch = (id: string) => {
    setVideoId(id);
      toggle();

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

  const handleFavourite = (id : string) => {
    if (movies !== undefined) {
        const result = movies?.findIndex((object) => object.id === id);
        movies[result].favourite = !movies[result].favourite;
        refreshLocalStorage(movies);
        setMovies(JSON.parse(localStorage.getItem('movies')!));
    }
  }

  return (
    <div className="content">
      <h5>Your favourite videos</h5>

      <GridView
        movies={movies}
        handleWatch={handleWatch}
        handleDelete={handleDelete}
        handleFavourite={handleFavourite}   
      />
      <ModalVideo videoId={videoId} toggle={toggle} modal={modal} />
    </div>
  );
};
