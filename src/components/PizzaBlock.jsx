import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeItem } from '../slices/cartSlice';

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const typePizzas = ['thin', 'traditional'];

  const [activeType, setActiveType] = useState(types[0] ?? 0);
  const [activeSize, setActiveSize] = useState(0);
  const size = sizes[activeSize];

  const key = `${id}_${size}_${activeType}`;
  const inCartCount = useSelector((state) => state.cart.items[key]?.count ?? 0);

  const dispatch = useDispatch();

  const handleIncrementPizza = () => {
    const item = {
      id,
      name: title,
      price,
      imageUrl,
      type: activeType,
      typeLabel: typePizzas[activeType],
      size,
    };
    dispatch(addToCart(item));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    dispatch(removeItem({ id, size, type: activeType }));
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={typeId === activeType ? 'active' : ''}
              onClick={() => setActiveType(typeId)}>
              {typePizzas[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={i === activeSize ? 'active' : ''}
              onClick={() => setActiveSize(i)}>
              {size}cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          type="button"
          onClick={handleIncrementPizza}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add pizza</span>
          {inCartCount > 0 && <i>{inCartCount}</i>}

          {inCartCount > 0 && (
            <span className="button__clear" role="button" onClick={handleClear} tabIndex={0}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden>
                <path
                  d="M3 3l6 6M9 3L3 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
