import { useState, useEffect, useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, setActiveSort, setCurrentPage } from '../slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Paginations';
import { SearchContext } from '../App';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';
const PAGE_SIZE = 8;

function Home() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [allPizzas, setAllPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((s) => s.filter.categories);
  const activeCategory = useSelector((s) => s.filter.activeCategory);
  const sortList = useSelector((s) => s.filter.sortList);
  const activeSort = useSelector((s) => s.filter.activeSort);
  const currentPage = useSelector((s) => s.filter.currentPage);

  const [searchParams, setSearchParams] = useSearchParams();

  // 1) Инициализация из URL при монтировании
  useEffect(() => {
    const cat = Number(searchParams.get('category') ?? 0);
    const sort = Number(searchParams.get('sortBy') ?? 0);
    const page = Number(searchParams.get('page') ?? 1);
    const q = searchParams.get('query') ?? '';

    dispatch(setActiveCategory(Number.isFinite(cat) ? cat : 0));
    dispatch(setActiveSort(Number.isFinite(sort) ? sort : 0));
    dispatch(setCurrentPage(Number.isFinite(page) && page > 0 ? page : 1));
    setSearchValue(q);
  }, [dispatch, searchParams, setSearchValue]);

  // 2) Ставим в URL при изменении фильтров/поиска/страницы
  useEffect(() => {
    const params = {};
    if (activeCategory > 0) params.category = String(activeCategory);
    if (activeSort > 0) params.sortBy = String(activeSort); // 0 — дефолт "popularity"
    if (currentPage > 1) params.page = String(currentPage);
    if (searchValue.trim()) params.query = searchValue.trim();

    setSearchParams(params, { replace: true });
  }, [activeCategory, activeSort, currentPage, searchValue, setSearchParams]);

  // Загрузка всех пицц 1 раз
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(APIpizzas)
      .then((res) => setAllPizzas(res.data))
      .catch((e) => {
        setError(e);
        console.error(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Обработчики
  const handleChangeCategory = (i) => {
    dispatch(setActiveCategory(i));
    dispatch(setCurrentPage(1));
  };
  const handleChangeSort = (i) => {
    dispatch(setActiveSort(i));
    dispatch(setCurrentPage(1));
  };
  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  // Обработка данных: поиск -> категория -> сортировка
  const processedPizzas = useMemo(() => {
    let items = [...allPizzas];

    const query = searchValue.trim().toLowerCase();
    if (query) items = items.filter((p) => p.name?.toLowerCase().includes(query));

    if (activeCategory > 0) items = items.filter((p) => Number(p.category) === activeCategory);

    const sortMap = ['rating', 'price', 'name']; // 0..2
    const sortBy = sortMap[activeSort] || 'rating';

    items.sort((a, b) =>
      sortBy === 'name' ? a.name.localeCompare(b.name) : b[sortBy] - a[sortBy],
    );

    return items;
  }, [allPizzas, searchValue, activeCategory, activeSort]);

  const pageCount = Math.ceil(processedPizzas.length / PAGE_SIZE);
  const paginatedPizzas = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return processedPizzas.slice(start, start + PAGE_SIZE);
  }, [processedPizzas, currentPage]);

  // Подрезка currentPage и скролл наверх
  useEffect(() => {
    if (pageCount === 0 && currentPage !== 1) {
      dispatch(setCurrentPage(1));
      return;
    }
    if (pageCount > 0 && currentPage > pageCount) {
      dispatch(setCurrentPage(pageCount));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageCount, currentPage, dispatch]);

  return (
    <>
      <div className="content__top">
        <Categories items={categories} value={activeCategory} onChange={handleChangeCategory} />
        <Sort items={sortList} value={activeSort} onChange={handleChangeSort} />
      </div>

      <h2 className="content__title">All pizzas</h2>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {!loading && processedPizzas.length === 0 && <p>Пицца с данным названием не найдена</p>}

      <div className="content__items">
        {loading
          ? [...new Array(PAGE_SIZE)].map((_, i) => <PizzaSkeleton key={i} />)
          : paginatedPizzas.map((p) => (
              <PizzaBlock
                key={p.id}
                id={p.id}
                title={p.name}
                price={p.price}
                imageUrl={p.imageUrl}
                sizes={p.sizes}
                types={p.types}
              />
            ))}
      </div>

      {pageCount > 1 && (
        <Pagination pageCount={pageCount} currentPage={currentPage} onChange={handleChangePage} />
      )}
    </>
  );
}

export default Home;
