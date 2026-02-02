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
          Oops! This page doesn’t exist.
          <br />
          It may have been moved or deleted.
        </p>

        <Link to="/" className="button button--black not-found__button">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
