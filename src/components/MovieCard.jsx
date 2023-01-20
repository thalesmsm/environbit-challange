import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MovieCard({ orderBySelected }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/db/movies.json')
      .then((res) => setMovies(res.data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4">
      { movies
        .sort((a, b) => (
          a[orderBySelected] < b[orderBySelected] ? -1
            : a[orderBySelected] > b[orderBySelected] ? 1 : 0
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

MovieCard.propTypes = {
  orderBySelected: PropTypes.string.isRequired,
};

export default MovieCard;
