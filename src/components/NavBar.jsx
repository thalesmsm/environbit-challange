import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
    <nav className="flex flex-col items-center md:justify-between bg-[#F25E21] p-4">
      <a
        href="https://environbit.com.br/"
        target="_blank"
        className="text-3xl h-12 font-bold"
        rel="noreferrer"
      >
        EnvironBIT Movies &#x1F3AC;
      </a>
      <div
        className="
        flex flex-col items-center md:flex-row md:justify-between md:px-4 md:w-full"
      >
        <label
          htmlFor="filter"
          className="block text-gray-800 text-sm font-bold mb-2"
        >
          Ordenar por:
          <select
            name="filter"
            id="filter"
            onChange={ handleChangeSelect }
            className="shadow rounded bg-slate-100
            border py-2 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline ml-2"
          >
            <option value="release">Lançamento</option>
            <option value="title">Nome</option>
            <option value="country">País</option>
          </select>
        </label>
        <div className="flex justify-center">
          <label htmlFor="findByName">
            <input
              type="text"
              placeholder="Pesquisar por filme"
              onChange={ handleChangeInput }
              className="shadow appearance-none border border-r-0 rounded-l
              py-2 px-3 text-gray-700 leading-tight bg-slate-100
              focus:outline-none focus:shadow-outline"
            />
          </label>
          <FontAwesomeIcon
            icon={ faMagnifyingGlass }
            className="shadow appearance-none border border-l-0 rounded-r
            py-2 px-3 h-5 bg-slate-100"
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
