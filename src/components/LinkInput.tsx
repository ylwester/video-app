import React, { useEffect, useState } from "react";
import * as dotenv from "dotenv";
import axios from "axios";
import { getYouTubeID } from "../utils/youtubeMovieUtils";
import { getSortedMovies, getTodaysDate, saveMovieToLocalStorage } from "../utils/utilities";
import "../styles/linkInput.css";
import { useYoutubeMovieContext } from "../App";
import { Alert } from "reactstrap";

dotenv.config();

interface LinkInputProps {
  favouriteFilter: Boolean,
  setFavouriteFilter: React.Dispatch<React.SetStateAction<Boolean>>,
}

export const LinkInput: React.FC<LinkInputProps> = ({  
  favouriteFilter,
  setFavouriteFilter}) => {
  const [linkInput, setLinkInput] = useState("");
  const [movie, setMovie] = useState<IMovie>();
  const { setMovies } = useYoutubeMovieContext();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    saveMovieToLocalStorage(movie);
    setMovies(getSortedMovies());
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
    let fullMovies : IMovie[] = getSortedMovies();
    axios
      .get(apiurl)
      .then((response) => {
        if(fullMovies.find(movie => movie.id === response.data.items[0].id)){
          setAlertMessage("Movie already exists");
          setVisible(true);
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
        if(favouriteFilter) setFavouriteFilter(!favouriteFilter);

      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="link-input-container">
      <Alert color="danger" isOpen={visible} toggle={onDismiss}>
        {alertMessage}
      </Alert>
      <form onSubmit={handleSubmit}>
        <input
         className="input-video"
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
