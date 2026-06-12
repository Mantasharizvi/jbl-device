import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  validateEmail, validateFullName, validatePassword, validateConfirmPassword,
} from '../utils/validators';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Signup = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
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
      const res = await axios.post(`${API}/auth/signup`, form);
      // Auto-login after signup
      login(res.data.user, res.data.token);
      setAlert({ type: 'success', msg: res.data.message });
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const data = err.response?.data;
      if (data?.code === 'EMAIL_ALREADY_EXISTS') {
        setAlert({
          type: 'error',
          msg: (
            <span>
              {data.message}{' '}
              <Link to="/login" style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline' }}>
                Login here
              </Link>
            </span>
          ),
        });
      } else if (data?.errors) {
        setErrors(data.errors);
      } else {
        setAlert({ type: 'error', msg: data?.message || 'Signup failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" data-testid="signup-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate data-testid="signup-form">
        <h2>SIGN UP</h2>
        <p className="auth-sub">Join the JBL family today</p>

        {alert && (
          <div className={`auth-alert ${alert.type}`} data-testid="signup-alert">{alert.msg}</div>
        )}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.fullName ? 'error' : ''}
            data-testid="signup-fullname"
          />
          {errors.fullName && <div className="error-text">{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={errors.email ? 'error' : ''}
            data-testid="signup-email"
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
              placeholder="At least 8 chars, A-a-1-!"
              className={errors.password ? 'error' : ''}
              data-testid="signup-password"
            />
            <span className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-password-wrap">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={errors.confirmPassword ? 'error' : ''}
              data-testid="signup-confirm"
            />
            <span className="toggle-pw" onClick={() => setShowConfirm(!showConfirm)}>
              <i className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="auth-btn" disabled={loading} data-testid="signup-submit">
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
