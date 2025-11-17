// import { useState, useEffect, useMemo } from 'react';

// import Categories from '../components/Categories';
// import Sort from '../components/Sort';
// import PizzaBlock from '../components/PizzaBlock';
// import PizzaSkeleton from '../components/PizzaSkeleton';
// import Pagination from '../components/Paginations';

// const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';
// const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];
// const sortList = ['popularity', 'price', 'alphabetically'];
// const PAGE_SIZE = 8;
// const pageCount = 2;

// function Home({ search }) {
//   const [pizzas, setPizzas] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeCategory, setActiveCategory] = useState(0);
//   const [activeSort, setActiveSort] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const params = new URLSearchParams();
//     if (activeCategory > 0) {
//       params.set('category', String(activeCategory));
//     }

//     const sortMap = ['rating', 'price', 'name'];
//     const sortBy = sortMap[activeSort];
//     params.set('sortBy', sortBy);
//     params.set('order', sortBy === 'name' ? 'asc' : 'desc');

//     params.set('page', String(currentPage));
//     params.set('limit', String(PAGE_SIZE));

//     const url = `${APIpizzas}?${params.toString()}`;

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
//         return response.json();
//       })
//       .then((data) => setPizzas(data))
//       .catch((e) => {
//         setError(e);
//         console.error(e);
//       })
//       .finally(() => setLoading(false));
//   }, [activeCategory, activeSort, currentPage]);

//   const filteredPizzas = useMemo(() => {
//     const searchPizza = search.trim().toLocaleLowerCase();
//     if (!searchPizza) {
//       return pizzas;
//     }
//     return pizzas.filter((pizza) => pizza.name?.toLocaleLowerCase().includes(searchPizza));
//   }, [pizzas, search]);

//   return (
//     <>
//       <div className="content__top">
//         <Categories items={categories} value={activeCategory} onChange={setActiveCategory} />
//         <Sort items={sortList} value={activeSort} onChange={setActiveSort} />
//       </div>

//       <h2 className="content__title">All pizzas</h2>

//       {error && <p>Error: {error.message}</p>}

//       {!loading && filteredPizzas.length === 0 && <p>Пицца с данным названием не найдена</p>}

//       <div className="content__items">
//         {loading
//           ? [...new Array(12)].map((_, index) => <PizzaSkeleton key={index} />)
//           : filteredPizzas.map((p) => (
//               <PizzaBlock
//                 key={p.id}
//                 title={p.name}
//                 price={p.price}
//                 imageUrl={p.imageUrl}
//                 sizes={p.sizes}
//                 types={p.types}
//               />
//             ))}
//       </div>

//       <Pagination pageCount={pageCount} currentPage={currentPage} onChange={setCurrentPage} />
//     </>
//   );
// }

// export default Home;

import { useState, useEffect, useMemo, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Paginations';
import { SearchContext } from '../App';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';
const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];
const sortList = ['popularity', 'price', 'alphabetically'];
const PAGE_SIZE = 8;

function Home() {
  const { searchValue } = useContext(SearchContext);
  // полный список
  const [allPizzas, setAllPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // локальное состояние UI
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState(0);

  // 1) ТОЛЬКО загрузка всех пицц
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(APIpizzas)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setAllPizzas)
      .catch((e) => {
        setError(e);
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  // обработчики со сбросом страницы
  const handleChangeCategory = (i) => {
    setActiveCategory(i);
    setCurrentPage(1); // сброс страницы тут
  };

  const handleChangeSort = (i) => {
    setActiveSort(i);
    setCurrentPage(1); // сброс страницы тут
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
      setCurrentPage(1);
      return;
    }
    // если текущая страница стала больше максимума — подрезаем
    if (pageCount > 0 && currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageCount, currentPage]);

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
        <Pagination pageCount={pageCount} currentPage={currentPage} onChange={setCurrentPage} />
      )}
    </>
  );
}

export default Home;
