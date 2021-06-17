import React from "react";
import { useYoutubeMovieContext } from "../App";
import { clearLocalStorage } from "../utils/utilities";

interface MenuComponentProps {

}

export const MenuComponent: React.FC<MenuComponentProps> = () => {
    const { movies, setMovies } = useYoutubeMovieContext();
    
    const handleClear = ():void => {
        clearLocalStorage();
        setMovies([])
    }
    
  return (
    <nav>
      <button onClick={handleClear}>Clear library</button>
      <button>Demo</button>
      <button>Favourites</button>
      <button>Display grid/list</button>
      <button>Sort</button>
    </nav>
  );
};
