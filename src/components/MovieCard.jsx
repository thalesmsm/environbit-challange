import { useContext, useEffect, useState } from 'react';
import getMovies from '../fetchs/moviesFetch';
import { Context } from '../context/Context';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(
    new Array(8).fill(false),
  );
  const {
    orderBy, inpValue,
  } = useContext(Context);

  useEffect(() => {
    getMovies().then((res) => setMovies(res));

    if (!localStorage.getItem('favorites')) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(new Array(8).fill(false)),
      );
    }

    setIsFavorite(JSON
      .parse(localStorage.getItem('favorites')));
  }, []);

  useEffect(() => {
    if (inpValue) {
      setMovies((m) => m
        .filter((movie) => movie.title.toLowerCase().includes(inpValue)));
    } else {
      getMovies().then((res) => setMovies(res));
    }
  }, [inpValue]);

  const setFavorite = (movieId) => {
    const updatedIsFavoriteState = isFavorite.map(
      (item, index) => (index === movieId - 1 ? !item : item),
    );
    setIsFavorite(updatedIsFavoriteState);
    localStorage.setItem('favorites', JSON.stringify(updatedIsFavoriteState));
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      { movies
        .sort((a, b) => (
          a[orderBy] < b[orderBy] ? -1
            : a[orderBy] > b[orderBy] ? 1 : 0
        ))
        .map((movie) => (
          <div
            className="flex flex-col items-center w-72 p-4 m-4 border rounded shadow-md"
            key={ movie.id }
          >
            <button
              type="button"
              onClick={ () => setFavorite(movie.id) }
            >
              <img
                src={ isFavorite[movie.id - 1]
                  ? '/star-solid.svg' : '/star-regular.svg' }
                alt="favorite icon"
                className="w-8 cursor-pointer"
              />
            </button>
            <p className="text-xl mb-2">{movie.title}</p>
            <img
              className="h-72 w-48 rounded-lg border"
              src={ movie.image }
              alt={ movie.title }
            />
            <p>{`Diretor: ${movie.director}`}</p>
            <p>{`País: ${movie.country}`}</p>
            <p>{`Ano de lançamento: ${movie.release}`}</p>
          </div>
        ))}
    </div>
  );
}

export default MovieCard;
