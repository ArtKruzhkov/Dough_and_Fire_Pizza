import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../slices/filterSlice';
import { useRef, useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/img/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/img/input_close_icon.svg';

function Search() {
  // @ts-ignore
  const searchValue = useSelector((s) => s.filter.searchValue) as string;
  const dispatch = useDispatch();

  const [local, setLocal] = useState<string>(searchValue);
  const inputEl = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setLocal('');
    dispatch(setSearchValue(''));
    inputEl.current?.focus();
  };

  useEffect(() => {
    setLocal(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const id = setTimeout(() => dispatch(setSearchValue(local)), 600);
    return () => clearTimeout(id);
  }, [local, dispatch]);

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
