import axios from 'axios';
import { useEffect, useState } from 'react';

function MovieCard() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/db/movies.json')
      .then((res) => setMovies(res.data));
  }, []);

  return ( 
    <div className='flex flex-wrap'>
      {movies.map((movie) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
          <p>{movie.director}</p>
          <p>{movie.country}</p>
          <p>{movie.release}</p>
          <img src={movie.image} alt={movie.title} />
        </div>
      ))}
    </div>
  );
}

export default MovieCard;