import axios from 'axios';
import { useEffect, useState } from 'react';

function MovieCard({orderBySelected}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/db/movies.json')
      .then((res) => setMovies(res.data));
  }, []);

  return ( 
    <div className='flex flex-wrap'>
      {movies
        .sort((a, b) => a[orderBySelected] < b[orderBySelected] ? -1 : a[orderBySelected] > b[orderBySelected] ? 1 : 0)
        .map((movie) => (
        <div
          className='flex flex-col items-center w-1/4'
          key={movie.id}
        >
          <p>{movie.title}</p>
          <img className="h-72" src={movie.image} alt={movie.title} />
          <p>{movie.director}</p>
          <p>{movie.country}</p>
          <p>{movie.release}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;