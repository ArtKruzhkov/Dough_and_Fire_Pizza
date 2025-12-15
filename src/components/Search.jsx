import { useRef, useContext, useEffect, useState } from 'react';
import { SearchContext } from '../App';
import { ReactComponent as SearchIcon } from '../assets/img/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/img/input_close_icon.svg';

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [local, setLocal] = useState(searchValue);
  const inputEl = useRef(null);

  useEffect(() => {
    setLocal(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const id = setTimeout(() => setSearchValue(local), 600);
    return () => clearTimeout(id);
  }, [local, setSearchValue]);

  const onClickClear = () => {
    setLocal('');
    setSearchValue('');
    inputEl.current.focus();
  };

  return (
    <div className="input__container">
      <label htmlFor="search-input" className="search-logo-label">
        <SearchIcon className="search-logo" />
      </label>

      <input
        ref={inputEl}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        id="search-input"
        className="input-search"
        type="text"
        placeholder="Search pizza..."
      />

      {local && <CloseIcon className="clear-input-logo" onClick={onClickClear} />}
    </div>
  );
}

export default Search;
