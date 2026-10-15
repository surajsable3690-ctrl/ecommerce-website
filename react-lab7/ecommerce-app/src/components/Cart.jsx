import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p className="status-msg">Your cart is empty.</p>
        <Link to="/" className="continue-link">← Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>

              <div className="qty-selector">
                <label>Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>
            </div>
            <p className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>
          Subtotal ({cart.reduce((n, i) => n + i.quantity, 0)} items):{' '}
          <strong>${total.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
              </div>
    </div>
  );
}

export default Cart;