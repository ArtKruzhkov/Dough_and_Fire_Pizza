import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useState, useMemo } from 'react';

import { pizzas } from './data/pizzas';
import './scss/app.scss';

function App() {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

  const [activeCategory, setActiveCategory] = useState(0);

  const visiblePizzas = useMemo(() => {
    if (activeCategory === 0) return pizzas;
    return pizzas.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
