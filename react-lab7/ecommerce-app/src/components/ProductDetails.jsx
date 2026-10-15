import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      setAdded(false);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Product not found.');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  if (loading) return <p className="status-msg">Loading product...</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-details">
      <Link to="/" className="back-link">← Back to products</Link>

      <div className="details-grid">
        <div className="details-img-wrap">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <h1>{product.title}</h1>
          <div className="product-rating">
            {'★'.repeat(Math.round(product.rating.rate))}
            {'☆'.repeat(5 - Math.round(product.rating.rate))}
            <span className="rating-count">({product.rating.count} ratings)</span>
          </div>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-category">Category: {product.category}</p>
          <p className="details-desc">{product.description}</p>

          <div className="qty-selector">
            <label>Qty:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button className="add-cart-btn large" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {added && <p className="added-msg">✓ Added to cart</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;