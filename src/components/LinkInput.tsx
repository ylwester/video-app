import React, { useEffect, useState } from "react";
import * as dotenv from "dotenv";
// import { getYoutubeMovie } from "../utils/youtubeMovieUtils";
import axios from "axios";
import { getYouTubeID } from "../utils/youtubeMovieUtils";
import { getTodaysDate, saveMovieToLocalStorage } from "../utils/utilities";

dotenv.config();

interface LinkInputProps {}

interface Movie {
  id: string,
  title: string,
  thumbnail: string,
  views: number,
  likes: number,
  addDate: string,
}

export const LinkInput: React.FC<LinkInputProps> = () => {
  const [linkInput, setLinkInput] = useState("");
  const [movie, setMovie] = useState<Movie>();

  useEffect(()=> {
    saveMovieToLocalStorage(movie);
    console.log(movie)
    console.log(JSON.parse(localStorage.getItem('movies')!))
  }, [movie])


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
      getYouTubeID(linkInput) +
      "&key=" +
      process.env.REACT_APP_YOUTUBE_API_KEY;

      fetchData(API_URL);
  };

  function fetchData(apiurl : string) {
    axios.get(apiurl)
    .then(response => {
      console.log(response);
              setMovie({
          id: response.data.items[0].id,
          title: response.data.items[0].snippet.title,
          thumbnail: response.data.items[0].snippet.thumbnails.standard.url,
          views: response.data.items[0].statistics.viewCount,
          likes: response.data.items[0].statistics.likeCount,
          addDate: getTodaysDate(), 
        });
    })
    .catch(error => console.log(error));
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={linkInput}
        onChange={(e) => setLinkInput(e.target.value)}
        name="input"
      />
      <button>
         Add video
      </button>
        </form>
    </div>
  );
};
