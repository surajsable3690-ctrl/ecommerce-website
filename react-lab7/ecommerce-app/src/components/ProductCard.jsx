import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-img-wrap">
          <img src={product.image} alt={product.title} />
        </div>
        <p className="product-title">{product.title}</p>
        <div className="product-rating">
          {'★'.repeat(Math.round(product.rating.rate))}
          {'☆'.repeat(5 - Math.round(product.rating.rate))}
          <span className="rating-count">({product.rating.count})</span>
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>
      <button className="add-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;