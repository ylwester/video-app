import React, { useEffect, useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage, getSortedMovies } from "../utils/utilities";
import { getYoutubeVideos } from "../utils/youtubeMovieUtils";
import './../styles/menuComponent.css'

interface MenuComponentProps {
  gridView: Boolean;
  setGridView: React.Dispatch<React.SetStateAction<Boolean>>;
  // sortedMovies: IMovie[] | undefined;
  // setSortedMovies: React.Dispatch<React.SetStateAction<IMovie[] | undefined>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  favouriteFilter: Boolean,
  setFavouriteFilter: React.Dispatch<React.SetStateAction<Boolean>>,
}

const DEMO_MOVIES = ["g0kgw2kkFnM", "IFAF3NYM_KI", "kXYiU_JCYtU", "eVTXPUF4Oz4", "YlUKcNNmywk", "t4O1LLk6qlY", "vx2u5uUu3DE", "RgKAFK5djSk", "60ItHLz5WEA", "j5-yKhDd64s"];

export const MenuComponent: React.FC<MenuComponentProps> = ({
  gridView,
  setGridView,
  setPageNumber,
  favouriteFilter,
  setFavouriteFilter,
}) => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const [sortMethod, setSortMethod] = useState<string>("latest");
  const [active, setActive] = useState<string>("");

  useEffect(()=> {
    favouriteFilter ? setActive("active") : setActive("")
  },[setActive, favouriteFilter])

  const handleClear = (): void => {
    clearLocalStorage();
    setMovies([]);
  };

  const handleDemoMovies = (array: string[]) => {
    getYoutubeVideos(array);
  };

  const handleFavourites = (event: any) => {
    let result: IMovie[];
    if (favouriteFilter) {
      setFavouriteFilter(false);
      setSortMethod('latest')
      setMovies(getSortedMovies());
      setPageNumber(0);
      return;
    }
    if (movies) {
      result = movies.filter((movie) => movie.favourite);
      setMovies(result);
      setFavouriteFilter(true);
      setPageNumber(0);
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
    <nav className="menu-container">
      <button onClick={handleClear}>Clear library</button>
      <button onClick={() => handleDemoMovies(DEMO_MOVIES)}>Demo</button>
      <button className={active} onClick={handleFavourites}>Favourites</button>
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
