import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <div className="not-found__emoji" aria-hidden>
          🍕
        </div>
        <h2 className="not-found__title">404 — Page not found</h2>
        <p className="not-found__text">
          Упс! Такой страницы нет.
          <br />
          Возможно, ссылка устарела или была удалена.
        </p>

        <Link to="/" className="button button--black not-found__button">
          На главную
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
