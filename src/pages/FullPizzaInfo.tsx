import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../slices/pizzasSlice';

type pizzaType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
};

function FullPizzaInfo() {
  const { id } = useParams<{ id: string | undefined }>();

  // @ts-ignore
  const dispatch = useDispatch();

  // @ts-ignore
  const { items, loading, error } = useSelector((s) => s.pizzas) as {
    items: pizzaType[] | [];
    loading: boolean;
    error: Error | null;
  };

  const pizza = useMemo(() => items.find((p) => String(p.id) === String(id)), [items, id]);

  useEffect(() => {
    if (!items || items.length === 0) {
      // @ts-ignore
      dispatch(fetchPizzas());
    }
  }, [dispatch, items]);

  if (loading && !pizza) return <h2>Loading…</h2>;
  if (error) return <p style={{ color: 'red' }}>Error: {String(error.message)}</p>;
  if (!pizza) {
    return (
      <div className="full-pizza full-pizza--empty">
        <h2>Pizza not found</h2>
        <Link className="button button--black" to="/">
          <span>back to home page</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="full-pizza">
      <div className="full-pizza__image-wrap">
        <img className="full-pizza__image" src={pizza.imageUrl} alt={pizza.name} />
      </div>

      <div className="full-pizza__content">
        <h1 className="full-pizza__title">{pizza.name}</h1>

        <div className="full-pizza__meta">
          {Array.isArray(pizza.sizes) && (
            <div className="full-pizza__row">
              <span className="full-pizza__label">Sizes:</span>
              <ul className="full-pizza__chips">
                {pizza.sizes.map((s) => (
                  <li key={s}>{s} cm</li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(pizza.types) && (
            <div className="full-pizza__row">
              <span className="full-pizza__label">Dough:</span>
              <ul className="full-pizza__chips">
                {pizza.types.map((t) => (
                  <li key={t}>{t === 0 ? 'thin' : 'traditional'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="full-pizza__footer">
          <div className="full-pizza__price">from {pizza.price} ₽</div>
          <div className="full-pizza__actions">
            <Link className="button button--outline" to="/">
              <span>back to main page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPizzaInfo;
