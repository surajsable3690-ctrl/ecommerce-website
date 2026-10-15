import { Link, useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-page">
        <p className="status-msg">No recent order found.</p>
        <Link to="/" className="continue-link">← Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1>Order Placed!</h1>
        <p className="confirmation-sub">
          Thank you, {order.shipping.fullName}. Your order has been confirmed.
        </p>

        <div className="confirmation-details">
          <div className="detail-row">
            <span>Order ID</span>
            <span>{order.id}</span>
          </div>
          <div className="detail-row">
            <span>Date</span>
            <span>{order.date}</span>
          </div>
          <div className="detail-row">
            <span>Items</span>
            <span>{order.itemCount}</span>
          </div>
          <div className="detail-row">
            <span>Total Paid</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span>Payment</span>
            <span>{order.shipping.paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}</span>
          </div>
          <div className="detail-row">
            <span>Shipping to</span>
            <span>
              {order.shipping.address}, {order.shipping.city} {order.shipping.zip}, {order.shipping.country}
            </span>
          </div>
        </div>

        <Link to="/" className="continue-link btn-style">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;