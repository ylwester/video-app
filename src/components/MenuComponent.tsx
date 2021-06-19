import React, { useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage, getSortedMovies } from "../utils/utilities";
import { getYoutubeVideos } from "../utils/youtubeMovieUtils";

interface MenuComponentProps {
  gridView: Boolean;
  setGridView: React.Dispatch<React.SetStateAction<Boolean>>;
  sortedMovies: IMovie[] | undefined;
  setSortedMovies: React.Dispatch<React.SetStateAction<IMovie[] | undefined>>;
}

const DEMO_MOVIES = ["pImrABc4s58", "AmUrarx3_0U", "zUaMZzKgxo0"];

export const MenuComponent: React.FC<MenuComponentProps> = ({
  gridView,
  setGridView,
}) => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const [favouriteFilter, setFavouriteFilter] = useState<Boolean>(false);
  const [sortMethod, setSortMethod] = useState<string>("latest");

  const handleClear = (): void => {
    clearLocalStorage();
    setMovies([]);
  };

  const handleDemoMovies = (array: string[]) => {
    getYoutubeVideos(array);
  };

  const handleFavourites = () => {
    let result: IMovie[];
    if (favouriteFilter) {
      setMovies(getSortedMovies());
      setFavouriteFilter(false);
      return;
    }
    if (movies) {
      result = movies.filter((movie) => movie.favourite);
      console.log(result);
      setMovies(result);
      setFavouriteFilter(true);
    }
  };

  const handleView = () => {
    setGridView(!gridView);
  };

  const handleSort = (event: any) => {
    setSortMethod(event.target.value);

    if (sortMethod === "oldest") {
      setMovies(
        [...movies!].sort(function (a: IMovie, b: IMovie) {
          return b.addDate.localeCompare(a.addDate);
        })
      );
      return;
    }
    if (sortMethod === "latest") {
      setMovies(
        [...movies!].sort(function (a: IMovie, b: IMovie) {
          return a.addDate.localeCompare(b.addDate);
        })
      );
      return;
    }
  };

  return (
    <nav>
      <button onClick={handleClear}>Clear library</button>
      <button onClick={() => handleDemoMovies(DEMO_MOVIES)}>Demo</button>
      <button onClick={handleFavourites}>Favourites</button>
      <button onClick={handleView}>
        {gridView ? "Display as List" : "Display as Grid"}
      </button>
      <select value={sortMethod} onChange={handleSort} name="sort" id="sort">
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
    </nav>
  );
};
