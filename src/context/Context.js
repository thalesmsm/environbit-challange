import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export default function Provider({ children }) {
  const [orderBy, setOrderBy] = useState('release');
  const [inpValue, setInputValue] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const initialContext = useMemo(() => ({
    orderBy,
    setOrderBy,
    inpValue,
    setInputValue,
    favoriteMovies,
    setFavoriteMovies,
  }), [orderBy,
    setOrderBy,
    inpValue,
    setInputValue,
    favoriteMovies,
    setFavoriteMovies,
  ]);

  return (
    <Context.Provider value={ initialContext }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
