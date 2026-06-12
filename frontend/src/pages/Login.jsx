import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail, validatePassword } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setAlert(null);
  };

  const runClientValidation = () => {
    const errs = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    Object.keys(errs).forEach((k) => { if (!errs[k]) delete errs[k]; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    if (!runClientValidation()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      login(res.data.user, res.data.token);
      setAlert({ type: 'success', msg: res.data.message });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      } else if (data?.code === 'USER_NOT_FOUND') {
        setAlert({
          type: 'error',
          msg: (
            <span>
              {data.message}{' '}
              <Link to="/signup" style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline' }}>
                Sign Up
              </Link>
            </span>
          ),
        });
      } else {
        setAlert({ type: 'error', msg: data?.message || 'Login failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate data-testid="login-form">
        <h2>LOGIN</h2>
        <p className="auth-sub">Welcome back to JBL — enter your details</p>

        {alert && (
          <div className={`auth-alert ${alert.type}`} data-testid="login-alert">{alert.msg}</div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={errors.email ? 'error' : ''}
            data-testid="login-email"
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'error' : ''}
              data-testid="login-password"
            />
            <span className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className="form-row">
          <label><input type="checkbox" /> Remember Me</label>
          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={loading} data-testid="login-submit">
          {loading ? 'Signing in…' : 'Login'}
        </button>

        <div className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
