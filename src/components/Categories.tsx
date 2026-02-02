type CategoriesProps = {
  items: string[];
  value: number;
  onChange: (index: number) => void;
};

function Categories({ items, value, onChange }: CategoriesProps) {
  return (
    <div className="categories">
      <ul className="categories__list">
        {items.map((label, i) => (
          <li key={label} className={i === value ? 'active' : ''} onClick={() => onChange(i)}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
