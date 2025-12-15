import { useState, useEffect, useMemo, useContext } from 'react';
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
  const { searchValue } = useContext(SearchContext);
  // полный список
  const [allPizzas, setAllPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // локальное состояние UI
  // const [currentPage, setCurrentPage] = useState(1);

  // Redux
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.filter.categories);
  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const sortList = useSelector((state) => state.filter.sortList);
  const activeSort = useSelector((state) => state.filter.activeSort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  // 1) ТОЛЬКО загрузка всех пицц
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(APIpizzas)
      .then((res) => {
        setAllPizzas(res.data);
      })
      .catch((e) => {
        setError(e);
        console.error(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // обработчики со сбросом страницы
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

  // обработка данных: поиск -> категория -> сортировка
  const processedPizzas = useMemo(() => {
    let items = [...allPizzas];

    const query = searchValue.trim().toLowerCase();
    if (query) items = items.filter((p) => p.name?.toLowerCase().includes(query));

    if (activeCategory > 0) items = items.filter((p) => Number(p.category) === activeCategory);

    const sortMap = ['rating', 'price', 'name'];
    const sortBy = sortMap[activeSort];

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

  // 2) ОДИН эффект для «подрезки» currentPage при изменении pageCount
  useEffect(() => {
    // если результатов нет — держим 1
    if (pageCount === 0 && currentPage !== 1) {
      dispatch(setCurrentPage(1));
      return;
    }
    // если текущая страница стала больше максимума — подрезаем
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
