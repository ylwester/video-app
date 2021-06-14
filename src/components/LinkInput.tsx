import React, { useEffect, useState } from "react";
import * as dotenv from "dotenv";
import axios from "axios";
import { getYouTubeID } from "../utils/youtubeMovieUtils";
import { getTodaysDate, saveMovieToLocalStorage } from "../utils/utilities";
import '../styles/linkInput.css'

dotenv.config();

interface LinkInputProps {}


export const LinkInput: React.FC<LinkInputProps> = () => {
  const [linkInput, setLinkInput] = useState("");
  const [movie, setMovie] = useState<IMovie>();

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
    <div className="link-input-container">
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
