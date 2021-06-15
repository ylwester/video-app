import React from 'react'
import '../styles/movieCard.css'
import {IoMdEye} from 'react-icons/io'
import { BiLike } from 'react-icons/bi'

interface MovieCardProps {
  movie: IMovie,
}

function numberWithCommas(x : number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
        return (

          <div className="movie-card">
            <div className="thumbnail-img">
              <img width="290px" height="160px" src={movie.thumbnail} alt={movie.title} />
            </div>
            <div className="card-statistics">
              <div className="stats-views">
                <IoMdEye /> {numberWithCommas(movie.views)}
                </div>
                <div className="stats-likes">
                 <BiLike/> {numberWithCommas(movie.likes)}
              </div>
            </div>
            <div className="card-title">
              {
                movie.title
              }
            </div>
            <div>
              buttony
            </div>
          </div>
        );
}