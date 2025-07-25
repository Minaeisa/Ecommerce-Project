import './NavBar.css';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars } from 'react-icons/fa';
import CartHoverDropdown from '../Cart/CartHoverDropdown';

function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { title: 'HOME', links: [{ path: '/home/fashion1', label: 'Fashion1' }] },
    {
      title: 'PAGES',
      links: [
        { path: '/pages/aboutus', label: 'About Us' },
        { path: '/pages/ContactUs', label: 'Contact Us' },
        { path: '/pages/faq', label: 'FAQ' },
        { path: '/pages/login', label: 'Login' },
        { path: '/pages/login?form=register', label: 'Register' },
        { path: '/pages/terms', label: 'Terms & Conditions' },
      ],
    },
    {
      title: 'PRODUCTS',
      links: [
        { path: '/category/electronics', label: 'Electronics' },
        { path: '/category/jewelery', label: 'Jewelery' },
        { path: "/category/men's clothing", label: "Men's Clothing" },
        { path: "/category/women's clothing", label: "Women's Clothing" },
      ],
    },
    { title: 'BLOG', links: [{ path: '/blog/grids', label: 'Grids' }] },
    { title: 'SHOP', links: [{ path: '/shop/layout', label: 'Shop Page Layout' }] },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <FaShoppingCart className="logo-icon" />
          <span className="logo-text">Shopwise</span>
        </div>

        <div className="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <FaBars />
        </div>

        <div className="nav-links">
          {menuItems.map((item, index) => (
            <div key={index} className="dropdown">
              <span className="dropbtn">{item.title} ▾</span>
              <div className="dropdown-content">
                {item.links.map((link, i) => (
                  <Link to={link.path} key={i}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link className="nav-item" to="/contactus">
            CONTACT US
          </Link>
        </div>

        <div className="right-icons">
          <FaSearch className="icon" />

          {isDesktop ? (
            <div
              className="cart-dropdown-wrapper"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link to="/cart" className="cart-icon relative">
                <FaShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
              {isCartOpen && (
                <div className="cart-dropdown">
                  <CartHoverDropdown />
                </div>
              )}
            </div>
          ) : (
            <Link to="/cart" className="cart-icon relative">
              <FaShoppingCart className="icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          )}

          <Link to="/pages/login" className="login-link">
            <FaUser className="icon" /> <span className="login-text">LOGIN</span>
          </Link>
        </div>

        {isMobileOpen && (
          <div className="mobile-menu">
            {menuItems.map((item, index) => (
              <div key={index} className="mobile-dropdown-group">
                <strong className="text-white text-sm">{item.title}</strong>
                {item.links.map((link, i) => (
                  <Link to={link.path} key={i} onClick={() => setIsMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <hr className="mobile-divider" />
              </div>
            ))}

            <Link to="/contactus" className="nav-item" onClick={() => setIsMobileOpen(false)}>
              CONTACT US
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
