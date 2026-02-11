import { setSearchValue } from '../slices/filterSlice';
import { useRef, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';

import { ReactComponent as SearchIcon } from '../assets/img/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/img/input_close_icon.svg';

function Search() {
  const searchValue = useAppSelector((s) => s.filter.searchValue);
  const dispatch = useAppDispatch();

  const [local, setLocal] = useState<string>(searchValue);
  const inputEl = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setLocal('');
    dispatch(setSearchValue(''));
    inputEl.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
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
        onChange={onChangeInput}
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
