import React, { useEffect, useState } from "react";
import * as dotenv from "dotenv";
import axios from "axios";
import { getYouTubeID } from "../utils/youtubeMovieUtils";
import { getTodaysDate, saveMovieToLocalStorage } from "../utils/utilities";
import "../styles/linkInput.css";
import { useYoutubeMovieContext } from "../App";

dotenv.config();

interface LinkInputProps {}

export const LinkInput: React.FC<LinkInputProps> = () => {
  const [linkInput, setLinkInput] = useState("");
  const [movie, setMovie] = useState<IMovie>();
  const { movies, setMovies } = useYoutubeMovieContext();

  useEffect(() => {
    saveMovieToLocalStorage(movie);
    console.log(JSON.parse(localStorage.getItem("movies")!));
    setMovies(JSON.parse(localStorage.getItem("movies")!));
  }, [movie, setMovies]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20player&id=" +
      getYouTubeID(linkInput) +
      "&key=" +
      process.env.REACT_APP_YOUTUBE_API_KEY;

    fetchData(API_URL);
    setLinkInput('');
  };

  function fetchData(apiurl: string) {
    axios
      .get(apiurl)
      .then((response) => {
        console.log(response);
        if(movies?.find(movie => movie.id === response.data.items[0].id)){
          console.log("already exists");
          return;
        }
        setMovie({
          id: response.data.items[0].id,
          title: response.data.items[0].snippet.title,
          thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
          views: response.data.items[0].statistics.viewCount,
          likes: response.data.items[0].statistics.likeCount,
          dislikes: response.data.items[0].statistics.dislikeCount,
          addDate: getTodaysDate(),
          favourite: false,
        });

      })
      .catch((error) => console.log(error));
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
        <button>Add video</button>
      </form>
    </div>
  );
};
