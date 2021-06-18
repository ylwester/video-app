import axios from "axios";
import * as dotenv from "dotenv";
import { getTodaysDate } from "./utilities";
dotenv.config();

export const getYouTubeID = (url: string) => {
    const [a, , b] = url
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (b !== undefined) {
      return b.split(/[^0-9a-z_-]/i)[0];
    } else {
      return a;
    }
  };

  export const getYoutubeVideos = (ids : string[]) => {
    const queryid = ids.join('%2C');
    const arrayOfMovies : IMovie[] = [];

    const API_URL =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20player&id=" +
      queryid +
      "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY;

      axios.get(API_URL)
      .then(response => {
        response.data.items.forEach((item: { id: any; snippet: { title: any; thumbnails: { medium: { url: any; }; }; }; statistics: { viewCount: any; likeCount: any; dislikeCount: any; }; }) => {
          const movie : IMovie = {
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            views: item.statistics.viewCount,
            likes: item.statistics.likeCount,
            dislikes: item.statistics.dislikeCount,
            addDate: getTodaysDate(),
            favourite: false,
          };
          arrayOfMovies.push(movie);
        });
        localStorage.setItem("movies", JSON.stringify(arrayOfMovies));
        console.log(JSON.parse(localStorage.getItem("movies")!));
        window.location.reload();
      })
  }