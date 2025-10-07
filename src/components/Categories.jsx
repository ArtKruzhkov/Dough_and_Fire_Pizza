import { useState } from 'react';

function Categories() {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Calzones'];
  const [active, setActive] = useState(0);

  const onClickCategory = (index) => {
    setActive(index);
  };

  return (
    <div className="categories">
      <ul className="categories__list">
        {categories.map((label, i) => (
          <li
            key={label}
            className={i === active ? 'active' : ''}
            onClick={() => onClickCategory(i)}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
