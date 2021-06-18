import React from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage } from "../utils/utilities";
import { getYoutubeVideos } from "../utils/youtubeMovieUtils";

interface MenuComponentProps {

}

const DEMO_MOVIES = ['pImrABc4s58', 'AmUrarx3_0U', 'zUaMZzKgxo0'];


export const MenuComponent: React.FC<MenuComponentProps> = () => {
    const { setMovies } = useYoutubeMovieContext();

    const handleClear = ():void => {
        clearLocalStorage();
        setMovies([])
    }

    const handleDemoMovies = (array : string[]) => {
      getYoutubeVideos(array);
    }

    
  return (
    <nav>
      <button onClick={handleClear}>Clear library</button>
      <button onClick={() => handleDemoMovies(DEMO_MOVIES)} >Demo</button>
      <button>Favourites</button>
      <button>Display grid/list</button>
      <button>Sort</button>
    </nav>
  );
};
