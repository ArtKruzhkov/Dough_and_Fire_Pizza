import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useState, useMemo, useEffect } from 'react';

import './scss/app.scss';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';

function App() {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(APIpizzas)
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
  }, []);

  const visiblePizzas = useMemo(() => {
    if (activeCategory === 0) return pizzas;
    return pizzas.filter((p) => p.category === activeCategory);
  }, [pizzas, activeCategory]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories items={categories} value={activeCategory} onChange={setActiveCategory} />
              <Sort />
            </div>

            <h2 className="content__title">All pizzas</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            <div className="content__items">
              {visiblePizzas.map((p) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
