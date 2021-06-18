export function getTodaysDate(): string {
  let date = new Date();
  let day = date.getDate().toString();
  let month = date.getMonth().toString();

  if (date.getDate() < 10) {
    day = "0" + date.getDate().toString();
  }

  if (date.getMonth() < 10) {
    month = "0" + date.getMonth().toString();
  }

  return day + "." + month + "." + date.getFullYear();
}

export function saveMovieToLocalStorage(movie: IMovie | undefined) {
  let moviesStorage = JSON.parse(localStorage.getItem("movies")!) || [];
  console.log(typeof moviesStorage);
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

export function saveMultipleMoviesToLocalStorage(ids : string[]) {
  
}