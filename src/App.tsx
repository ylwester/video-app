import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import * as dotenv from "dotenv";
import { LinkInput } from "./components/LinkInput";
import { DisplayMovies } from "./components/DisplayMovies";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuComponent } from "./components/MenuComponent";
import { getSortedMovies } from "./utils/utilities";

dotenv.config();

interface MoviesContextType {
  movies: IMovie[] | undefined;
  setMovies: (movies: IMovie[]) => void;
}

export const YoutubeMoviesContext = createContext<MoviesContextType>(
  {} as MoviesContextType
);
export const useYoutubeMovieContext = () => useContext(YoutubeMoviesContext);

function App() {
  const [movies, setMovies] = useState<IMovie[]>();
  const [gridView, setGridView] = useState<Boolean>(true);
  const [sortedMovies, setSortedMovies] = useState<IMovie[]>();
  const [pageNumber, setPageNumber] = useState<number>(0)

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(getSortedMovies());
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>YouTube video library</h3>
      </header>
      <section className="content-wrapper">
      <YoutubeMoviesContext.Provider value={{ movies, setMovies }}>
          <LinkInput />
          <MenuComponent setPageNumber={setPageNumber} sortedMovies={sortedMovies} setSortedMovies={setSortedMovies} gridView={gridView} setGridView={setGridView} />
          {movies ?           
          <DisplayMovies pageNumber={pageNumber} setPageNumber={setPageNumber} gridView={gridView} /> 
          : 
          "Loading" }
      </YoutubeMoviesContext.Provider>
      </section>
    </div>
  );
}

export default App;
