import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setAdded('exists');
    } else {
      const updated = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      setAdded('added');
      window.dispatchEvent(new Event('storage'));
    }
    setTimeout(() => setAdded(null), 2000);
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 relative">
      {added === 'added' && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded shadow">
          ✅ Product added to cart
        </div>
      )}
      {added === 'exists' && (
        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded shadow">
          ⚠️ Product is already in cart
        </div>
      )}
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-contain"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {product.rating && (
          <div className="mb-3 text-sm text-gray-700">
            Rating: ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
          </div>
        )}

        <div className="text-sm text-gray-500 mb-1">Category: {product.category}</div>
        <div className="text-xl font-semibold text-indigo-600 mb-4">
          ${product.price}
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;
