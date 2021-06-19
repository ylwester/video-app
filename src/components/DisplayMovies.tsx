import React, { useState } from "react";
import { useYoutubeMovieContext } from "../App";
import { GridView } from "./GridView";
import "../styles/displayMovies.css";
import { refreshLocalStorage } from "../utils/utilities";
import { ModalVideo } from "./ModalVideo";
import { ListView } from "./ListView";
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';

interface DisplayMoviesProps {
  gridView: Boolean,
  sortedMovies: IMovie[] | undefined,
  setSortedMovies: React.Dispatch<React.SetStateAction<IMovie[] | undefined>>,
}


export const DisplayMovies: React.FC<DisplayMoviesProps> = ({ sortedMovies, setSortedMovies, gridView }) => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const [modal, setModal] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0)

  const MOVIES_PER_PAGE = 9;
  const pagesVisited = pageNumber * MOVIES_PER_PAGE;

  let pageCount : number;
  if(movies)
    pageCount = Math.ceil(movies.length / MOVIES_PER_PAGE);

    const changePage = ({ selected } : any) => {
      setPageNumber(selected);
    };

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
      setMovies(JSON.parse(localStorage.getItem("movies")!));
    }

    console.log("delete clicked" + id);
  };

  const handleFavourite = (id: string) => {
    if (movies !== undefined) {
      const result = movies?.findIndex((object) => object.id === id);
      movies[result].favourite = !movies[result].favourite;
      refreshLocalStorage(movies);
      setMovies(JSON.parse(localStorage.getItem("movies")!));
    }
  };

  return (
    <div className="content">
      <h5>Your favourite videos</h5>
      {gridView ? (
        <GridView
          pages={{pagesVisited, MOVIES_PER_PAGE}}
          movies={movies}
          handleWatch={handleWatch}
          handleDelete={handleDelete}
          handleFavourite={handleFavourite}
        />
      ) : (
        <ListView
          pages={{pagesVisited, MOVIES_PER_PAGE}}
          movies={movies}
          handleWatch={handleWatch}
          handleDelete={handleDelete}
          handleFavourite={handleFavourite}
        />
      )}
      <ModalVideo videoId={videoId} toggle={toggle} modal={modal} />
      <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount!}
              onPageChange={changePage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName="pagination"
      />

    </div>
  );
};
