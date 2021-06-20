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
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
}


export const DisplayMovies: React.FC<DisplayMoviesProps> = ({ pageNumber, setPageNumber, gridView}) => {
  const { movies, setMovies } = useYoutubeMovieContext();
  const [modal, setModal] = useState(false);

  const MOVIES_PER_PAGE = 9;
  let pagesVisited = pageNumber * MOVIES_PER_PAGE;

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
  };

  const handleDelete = (id: string) => {
    if (movies !== undefined) {
      const result = movies?.findIndex((object) => object.id === id);
      movies.splice(result, 1);
      refreshLocalStorage(movies);
      setMovies(JSON.parse(localStorage.getItem("movies")!));
    }
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
      <div className="videos-header">
      <h5>Your videos</h5>
      <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount!}
              onPageChange={changePage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              containerClassName="pagination"
              activeLinkClassName="pagination-active-link"
              disabledClassName="pagination-disabled"
              forcePage={pageNumber}
      />
      </div>
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

    </div>
  );
};
