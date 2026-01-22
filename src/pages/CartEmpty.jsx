import { Link } from 'react-router-dom';
import emptyCart from '../assets/img/empty-cart.png';

function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty.{' '}
        <span role="img" aria-label="confused">
          😕
        </span>
      </h2>
      <p>
        You probably haven’t ordered any pizza yet.
        <br />
        To place an order, go back to the home page.
      </p>

      <img src={emptyCart} alt="Empty cart" />

      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
