import React, { useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage } from "../utils/utilities";
import { getYoutubeVideos } from "../utils/youtubeMovieUtils";

interface MenuComponentProps {

}

const DEMO_MOVIES = ['pImrABc4s58', 'AmUrarx3_0U', 'zUaMZzKgxo0'];


export const MenuComponent: React.FC<MenuComponentProps> = () => {
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

    
  return (
    <nav>
      <button onClick={handleClear}>Clear library</button>
      <button onClick={() => handleDemoMovies(DEMO_MOVIES)} >Demo</button>
      <button onClick={handleFavourites}>Favourites</button>
      <button>Display grid/list</button>
      <button>Sort</button>
    </nav>
  );
};
