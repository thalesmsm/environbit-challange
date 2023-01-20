import { useState } from 'react';
import MovieCard from './MovieCard';

function HomePage() {
  const [orderBy, setOrderBy] = useState('release');

  const handleChangeSelect = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <div>
      <nav>
        <label htmlFor="filter">
          Ordenar por:
          <select
            name="filter"
            id="filter"
            onChange={ handleChangeSelect }
            className="ml-2"
          >
            <option value="release">Lançamento</option>
            <option value="title">Nome</option>
            <option value="country">País</option>
          </select>
        </label>
      </nav>
      <MovieCard orderBySelected={ orderBy } />
    </div>
  );
}

export default HomePage;
