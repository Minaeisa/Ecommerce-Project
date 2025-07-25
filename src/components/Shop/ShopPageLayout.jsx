import  { useEffect, useState } from 'react';
import axios from 'axios';

function ShopPageLayout() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setAlertMessage('⚠️ Product is already in the cart!');
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setAlertMessage('✅ Product added to cart!');
    }

    setTimeout(() => setAlertMessage(''), 2000); 
  };

  const sortedProducts = [...products]
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating.rate - a.rating.rate;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛍️ Shop All Products</h1>

      {alertMessage && (
        <div className="mb-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded">
          {alertMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow hover:shadow-md p-4 relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain mb-2"
            />
            <h2 className="font-semibold truncate mb-1">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-1">${product.price}</p>
            <p className="text-sm text-yellow-600 mb-1">
              ⭐ {product.rating?.rate} ({product.rating?.count})
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full mt-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPageLayout;
