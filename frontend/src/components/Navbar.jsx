import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef(null);

  const isAbout = location.pathname === '/about';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" data-testid="navbar-logo">JBL</NavLink>

        <ul className={`navbar-menu ${open ? 'open' : ''}`} data-testid="navbar-menu">
          <li><NavLink to="/" end className={({ isActive }) => isActive && !isAbout ? 'active' : ''} onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Product</NavLink></li>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Service</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>About Us</NavLink></li>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Contact Us</NavLink></li>
          {!isLoggedIn && (
            <>
              <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Login</NavLink></li>
              <li><NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Signup</NavLink></li>
            </>
          )}
        </ul>

        <div className="navbar-icons" data-testid="navbar-icons">
          <i className="fa-solid fa-magnifying-glass" title="Search"></i>

          {/* User Account Icon */}
          <div className="user-account-wrapper" ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <div
                  className="user-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={user?.fullName}
                  data-testid="user-avatar"
                >
                  {getInitials(user?.fullName)}
                </div>
                {dropdownOpen && (
                  <div className="user-dropdown" data-testid="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="user-dropdown-avatar">{getInitials(user?.fullName)}</div>
                      <div>
                        <div className="user-dropdown-name">{user?.fullName}</div>
                        <div className="user-dropdown-email">{user?.email}</div>
                      </div>
                    </div>
                    <div className="user-dropdown-divider"></div>
                    <button
                      className="user-dropdown-btn"
                      onClick={handleLogout}
                      data-testid="logout-btn"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <i
                className="fa-solid fa-user"
                title="Account"
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer' }}
              ></i>
            )}
          </div>

          <i className="fa-solid fa-heart" title="Wishlist"></i>
          <i className="fa-solid fa-cart-shopping" title="Cart"></i>
        </div>

        <div className="hamburger" onClick={() => setOpen(!open)} data-testid="navbar-hamburger">
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
