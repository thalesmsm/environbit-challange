import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import getMovies from '../fetchs/moviesFetch';
import { Context } from '../context/Context';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(
    new Array(8).fill(false),
  );
  const {
    orderBy, inpValue, favoriteMovies,
    setFavoriteMovies,
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

    favoriteMovies.push(movies.find((mov) => mov.id === movieId));
    const items = [...favoriteMovies];
    setFavoriteMovies(items);
  };

  return (
    <div className="flex flex-wrap justify-center p-4 bg-[#39268B]">
      { movies
        .sort((a, b) => (
          a[orderBy] < b[orderBy] ? -1
            : a[orderBy] > b[orderBy] ? 1 : 0
        ))
        .map((movie) => (
          <div
            className="flex flex-col items-center w-72 p-4 m-4
            border rounded shadow-md bg-slate-100"
            key={ movie.id }
          >
            <button
              type="button"
              onClick={ () => setFavorite(movie.id) }
              className="text-2xl text-start w-full"
            >

              { isFavorite[movie.id - 1]
                ? <FontAwesomeIcon icon={ faStar } className="text-yellow-400" />
                : <FontAwesomeIcon icon={ faStarRegular } /> }

            </button>
            <p className="text-xl mb-2 font-bold">{movie.title}</p>
            <img
              className="h-72 w-48 rounded-lg border"
              src={ movie.image }
              alt={ movie.title }
            />
            <div className="flex flex-col">
              <div>
                <span className="text-md text-gray-500 font-bold">Diretor: </span>
                <span className="text-sm">{movie.director}</span>
              </div>
              <div>
                <span className="text-md text-gray-500 font-bold">País: </span>
                <span className="text-sm">{movie.country}</span>
              </div>
              <div>
                <span
                  className="text-md text-gray-500 font-bold"
                >
                  Ano de lançamento:
                  {' '}

                </span>
                <span className="text-sm">{movie.release}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MovieCard;
