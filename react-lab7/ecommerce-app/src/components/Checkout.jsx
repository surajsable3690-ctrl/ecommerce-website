import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const emptyForm = {
  fullName: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  paymentMethod: 'card',
};

function Checkout({ cart, clearCart }) {
  const [formData, setFormData] = useState(emptyForm);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p className="status-msg">Your cart is empty.</p>
        <Link to="/" className="continue-link">← Continue shopping</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      total,
      itemCount,
      shipping: formData,
      date: new Date().toLocaleDateString(),
    };

    clearCart();
    navigate('/order-confirmation', { state: { order } });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <h2>Payment Method</h2>

          <div className="payment-options">
            <label className={formData.paymentMethod === 'card' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
              />
              Credit / Debit Card
            </label>

            <label className={formData.paymentMethod === 'cod' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.title.slice(0, 28)}{item.title.length > 28 ? '...' : ''} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total ({itemCount} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;