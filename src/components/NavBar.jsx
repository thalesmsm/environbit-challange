import { useContext } from 'react';
import { Context } from '../context/Context';

function NavBar() {
  const {
    setOrderBy, setInputValue,
  } = useContext(Context);

  const handleChangeSelect = (e) => {
    setOrderBy(e.target.value);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <nav>
      <label htmlFor="findByName">
        <input
          type="text"
          onChange={ handleChangeInput }
        />
      </label>
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
  );
}

export default NavBar;
