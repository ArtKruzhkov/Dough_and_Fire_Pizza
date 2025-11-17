import { ReactComponent as SearchIcon } from '../assets/img/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/img/input_close_icon.svg';
import { useContext } from 'react';
import { SearchContext } from '../App';

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className="input__container">
      <label htmlFor="search-input" className="search-logo-label">
        <SearchIcon className="search-logo" />
      </label>

      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="search-input"
        className="input-search"
        type="text"
        placeholder="Search pizza..."
      />

      {searchValue && <CloseIcon className="clear-input-logo" onClick={() => setSearchValue('')} />}
    </div>
  );
}

export default Search;
