import { ReactComponent as SearchIcon } from '../assets/img/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/img/input_close_icon.svg';

function Search({ value, onChange }) {
  return (
    <div className="input__container">
      <label htmlFor="search-input" className="search-logo-label">
        <SearchIcon className="search-logo" />
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-input"
        className="input-search"
        type="text"
        placeholder="Search pizza..."
      />

      {value && <CloseIcon className="clear-input-logo" onClick={() => onChange('')} />}
    </div>
  );
}

export default Search;
