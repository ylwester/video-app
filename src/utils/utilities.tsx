export function getTodaysDate(): string {
  let date = new Date();
  let day = date.getDate().toString();
  let month = date.getMonth().toString();
  let hour = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  let seconds = date.getSeconds().toString();

  if (date.getDate() < 10) {
    day = "0" + date.getDate().toString();
  }

  if (date.getMonth() < 10) {
    month = "0" + date.getMonth().toString();
  }
  if (date.getHours() < 10) {
    hour = "0" + date.getHours().toString();
  }
  if (date.getMinutes() < 10) {
    minutes = "0" + date.getMinutes().toString();
  }
  if (date.getSeconds() < 10) {
    seconds = "0" + date.getSeconds().toString();
  }

  return day + "." + month + "." + date.getFullYear() + " " + hour+ ":" + minutes + ":" + seconds;
}

export function saveMovieToLocalStorage(movie: IMovie | undefined) {
  let moviesStorage = JSON.parse(localStorage.getItem("movies")!) || [];
  moviesStorage.push(movie);

  if (!movie) return;

  let myArray = [];
  myArray.push(moviesStorage);
  localStorage.setItem("movies", JSON.stringify(moviesStorage));
}

export function refreshLocalStorage(movies: IMovie[]) {
  localStorage.setItem("movies", JSON.stringify(movies));
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function clearLocalStorage() {
  localStorage.removeItem('movies');
}

export function getSortedMovies() : any {
  if(localStorage.getItem("movies"))
  return JSON.parse(localStorage.getItem("movies")!).sort(function(a : IMovie, b : IMovie) {
    return b.addDate.localeCompare(a.addDate);
  })
}

export function saveMultipleMoviesToLocalStorage(ids : string[]) {
  
}