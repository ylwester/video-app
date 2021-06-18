import React, { useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage } from "../utils/utilities";
import { getYoutubeVideos } from "../utils/youtubeMovieUtils";

interface MenuComponentProps {
  gridView: Boolean,
  setGridView: React.Dispatch<React.SetStateAction<Boolean>>,
}

const DEMO_MOVIES = ['pImrABc4s58', 'AmUrarx3_0U', 'zUaMZzKgxo0'];


export const MenuComponent: React.FC<MenuComponentProps> = ({gridView, setGridView}) => {
    const { movies, setMovies } = useYoutubeMovieContext();
    const [favouriteFilter, setFavouriteFilter] = useState<Boolean>(false);

    const handleClear = ():void => {
        clearLocalStorage();
        setMovies([])
    }

    const handleDemoMovies = (array : string[]) => {
      getYoutubeVideos(array);
    }
    
    const handleFavourites = () => {
      let result: IMovie[];
      if(favouriteFilter){
        setMovies(JSON.parse(localStorage.getItem("movies")!));
        setFavouriteFilter(false);
        return;
      }
      if(movies){
        result = movies.filter((movie) => movie.favourite);
        console.log(result);
        setMovies(result);
        setFavouriteFilter(true);
      }
    }

    const handleView = () => {
      setGridView(!gridView);
    }

    
  return (
    <nav>
      <button onClick={handleClear}>Clear library</button>
      <button onClick={() => handleDemoMovies(DEMO_MOVIES)} >Demo</button>
      <button onClick={handleFavourites}>Favourites</button>
      <button onClick={handleView}>{gridView ? "Display as List" : "Display as Grid" }</button>
      <button>Sort</button>
    </nav>
  );
};
