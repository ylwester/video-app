import React from "react";
import "../styles/movieCard.css";
import { IoMdEye, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiLike, BiDislike } from "react-icons/bi";
import { numberWithCommas } from "../utils/utilities";
import './../styles/gridView.css';

interface GridViewProps {
  movies: IMovie[] | undefined;
  handleWatch: (id: string) => void;
  handleDelete: (id: string) => void;
  handleFavourite: (id: string) => void;
  pages : {
    pagesVisited: number,
    MOVIES_PER_PAGE: number,
  }
}

export const GridView: React.FC<GridViewProps> = ({
  movies,
  handleWatch,
  handleDelete,
  handleFavourite,
  pages,
}) => {

  return (
    <div className="movies-container">
      { movies
        ? movies
        .slice(pages.pagesVisited, pages.pagesVisited + pages.MOVIES_PER_PAGE)
        .map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="thumbnail-img">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  onClick={() => handleWatch(movie.id)}
                />
              </div>
              <div className="card-statistics">
                <div className="stats-views">
                  <IoMdEye /> {numberWithCommas(movie.views)}
                </div>
                <div className="likes-container">
                  <div className="stats-likes">
                    <BiLike /> {numberWithCommas(movie.likes)}
                  </div>
                  <div className="stats-likes">
                    <BiDislike /> {numberWithCommas(movie.dislikes)}
                  </div>
                </div>
              </div>
              <div className="card-title">{movie.title}</div>
              <div className="card-buttons">
                <input
                  type="button"
                  name="watchbutton"
                  value="Watch"
                  onClick={() => handleWatch(movie.id)}
                />
                <input
                  type="button"
                  name="deletebutton"
                  value="Delete"
                  onClick={() => handleDelete(movie.id)}
                />
                
                 <button style={{backgroundColor: "transparent", outline: "none", border: "none"}} onClick={() => handleFavourite(movie.id)}> { movie.favourite ? <IoMdHeart /> : <IoMdHeartEmpty /> } </button>
                
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
