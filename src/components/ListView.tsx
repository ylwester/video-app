import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoMdEye, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { numberWithCommas } from "../utils/utilities";
import "./../styles/listView.css";

interface ListViewProps {
  movies: IMovie[] | undefined;
  handleWatch: (id: string) => void;
  handleDelete: (id: string) => void;
  handleFavourite: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  movies,
  handleWatch,
  handleDelete,
  handleFavourite,
}) => {
  return (
    <div className="listview-container">
      {movies?.length !== 0
        ? movies?.map((movie) => (
            <div key={movie.id} className="list-item">
              <div className="list-name-header">
                <div>{movie.title}</div>
              </div>
              <div className="list-item-content">
                <div className="content-statistics">
                  <div>
                    <IoMdEye /> {numberWithCommas(movie.views)}
                  </div>
                  <div>
                    <BiLike /> {numberWithCommas(movie.likes)}
                  </div>
                  <div>
                    <BiDislike /> {numberWithCommas(movie.dislikes)}
                  </div>
                </div>
                <div>
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
            </div>
          ))
        : null}
    </div>
  );
};
