function Filters({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-search"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'All' ? 'All Categories' : cat}
          </option>
        ))}
      </select>

      <div className="price-filter">
        <label>Max price: ${maxPrice}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Avg. Customer Rating</option>
      </select>
    </div>
  );
}

export default Filters;