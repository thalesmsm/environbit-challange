import { useContext, useEffect, useState } from 'react';
import getMovies from '../fetchs/moviesFetch';
import { Context } from '../context/Context';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const {
    orderBy, inpValue,
  } = useContext(Context);

  useEffect(() => {
    getMovies().then((res) => setMovies(res));
  }, []);

  useEffect(() => {
    if (inpValue) {
      setMovies((m) => m
        .filter((movie) => movie.title.toLowerCase().includes(inpValue)));
    } else {
      getMovies().then((res) => setMovies(res));
    }
  }, [inpValue]);

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
