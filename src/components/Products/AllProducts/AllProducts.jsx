import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setMessage('⚠️ Product already in cart!');
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setMessage('✅ Product added to cart!');
    }

    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div className="relative">
      {message && (
        <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-[9999] transition-opacity duration-300">
          {message}
        </div>
      )}
<div className="w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="text-indigo-600 font-bold text-lg mb-2">${product.price}</div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-auto">
  <Link
    to={`/products/${product.id}`}
    className="bg-gray-100 hover:bg-gray-200 text-indigo-700 px-3 py-1.5 rounded text-xs text-center w-full sm:w-auto"
  >
    View Details
  </Link>
  <button
    onClick={() => handleAddToCart(product)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded text-xs w-full sm:w-auto"
  >
    Add to Cart 🛒
  </button>
</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
