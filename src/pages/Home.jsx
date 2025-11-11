import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';
const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];
const sortList = ['popularity', 'price', 'alphabetically'];

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (activeCategory > 0) {
      params.set('category', String(activeCategory));
    }

    const sortMap = ['rating', 'price', 'name'];
    const sortBy = sortMap[activeSort];
    params.set('sortBy', sortBy);
    params.set('order', sortBy === 'name' ? 'asc' : 'desc');

    const url = `${APIpizzas}?${params.toString()}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setPizzas(data))
      .catch((e) => {
        setError(e);
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, [activeCategory, activeSort]);

  return (
    <>
      <div className="content__top">
        <Categories items={categories} value={activeCategory} onChange={setActiveCategory} />
        <Sort items={sortList} value={activeSort} onChange={setActiveSort} />
      </div>

      <h2 className="content__title">All pizzas</h2>

      {error && <p>Error: {error.message}</p>}

      <div className="content__items">
        {loading
          ? [...new Array(12)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((p) => (
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
    </>
  );
}

export default Home;
