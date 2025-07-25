import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
        <p className="text-gray-600">Please add some products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="divide-y divide-gray-200">
          {cart.map((item, i) => (
            <li key={i} className="flex items-center gap-4 py-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
        <div className="text-right mt-4 text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium" htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            maxLength={16}
            pattern="\d{16}"
            placeholder="1234 5678 9012 3456"
            required
            value={form.cardNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="expiryDate">Expiry Date</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="month"
              required
              value={form.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="password"
              maxLength={3}
              pattern="\d{3}"
              required
              value={form.cvv}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
