import { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import ProductList from '../components/ProductList';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to load products.');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Derived: category list built from products, no separate state needed
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Derived: filtered + sorted list, recomputed every render
  let visibleProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => p.price <= maxPrice);

  if (sortBy === 'price-asc') {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    visibleProducts = [...visibleProducts].sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
  }

  return (
    <div className="home">
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading && <p className="status-msg">Loading products...</p>}
      {!loading && error && <p className="status-msg error">{error}</p>}
      {!loading && !error && (
        <ProductList products={visibleProducts} addToCart={addToCart} />
      )}
    </div>
  );
}

export default Home;