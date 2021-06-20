interface IMovie {
    id: string,
    title: string,
    thumbnail: string,
    views: number,
    likes: number,
    dislikes: number,
    addDate: string,
    favourite?: boolean 
  }

  interface FavoritesType {
    isSet: Boolean,
    className: string,
  }
  