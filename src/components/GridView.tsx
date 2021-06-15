import React from "react";
import "../styles/movieCard.css";
import { IoMdEye } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { numberWithCommas } from "../utils/utilities";

interface GridViewProps {
  movies: IMovie[] | undefined;
  handleWatch: () => void;
  handleDelete: (id: string) => void;
 }

export const GridView: React.FC<GridViewProps> = ({ movies, handleWatch, handleDelete }) => {
  return (
    <div className="movies-container">
      {movies?.length !== 0
        ? movies?.map((movie) => (
            <div className="movie-card">
              <div className="thumbnail-img">
                <img
                  width="290px"
                  height="160px"
                  src={movie.thumbnail}
                  alt={movie.title}
                />
              </div>
              <div className="card-statistics">
                <div className="stats-views">
                  <IoMdEye /> {numberWithCommas(movie.views)}
                </div>
                <div className="stats-likes">
                  <BiLike /> {numberWithCommas(movie.likes)}
                </div>
              </div>
              <div className="card-title">{movie.title}</div>
              <div>buttony
                  <input type="button" name="watchbutton" value="Obejrzyj" onClick={handleWatch} />
                  <input type="button" name="deletebutton" value="Usuń" onClick={() => handleDelete(movie.id)} />

              </div>
            </div>
          ))
        : null}
    </div>
  );
};
