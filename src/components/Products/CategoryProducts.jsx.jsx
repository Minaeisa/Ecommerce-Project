import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [addedMsg, setAddedMsg] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setAddedMsg('⚠️ Product already in cart');
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setAddedMsg('✅ Product added to cart');
    }

    setTimeout(() => setAddedMsg(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 relative">
      {addedMsg && (
        <div className="fixed top-4 right-4 bg-indigo-100 text-indigo-800 px-4 py-2 rounded shadow z-50 text-sm sm:text-base">
          {addedMsg}
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mb-6 capitalize">{categoryName}</h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-3 sm:p-4 rounded shadow hover:shadow-lg transition flex flex-col bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 sm:h-44 object-contain mb-3"
            />
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3">${product.price}</p>

            <div className="mt-auto flex flex-col sm:flex-row gap-2">
              <Link
                to={`/products/${product.id}`}
                className="w-full sm:w-1/2 bg-gray-200 text-center py-2 text-sm rounded hover:bg-gray-300"
              >
                View
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full sm:w-1/2 bg-indigo-600 text-white py-2 text-sm rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
