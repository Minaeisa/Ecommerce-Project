import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FilteredProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-12">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 capitalize text-center sm:text-left">
        Category: {category}
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-md transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 sm:h-48 object-contain mb-4"
              />
              <h2 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-500 text-sm mb-2">${product.price}</p>
              <p className="text-sm mb-3 text-gray-700 line-clamp-2">{product.description}</p>

              <div className="flex flex-col sm:flex-row justify-between gap-2 mt-auto">
                <Link
                  to={`/products/${product.id}`}
                  className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 text-sm rounded"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>

              {addedId === product.id && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded shadow">
                  ✅ Added
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilteredProducts;
