import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from '../utils/validators';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=token+new password
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [form, setForm] = useState({ token: '', newPassword: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [devToken, setDevToken] = useState(''); // for demo: show token from API

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/forgot-password`, { email });
      // In dev: API returns the token; in production it would email it
      if (res.data.resetToken) {
        setDevToken(res.data.resetToken);
      }
      setAlert({ type: 'success', msg: 'Reset token generated! Check the blue box below (dev mode).' });
      setStep(2);
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setAlert(null);
    const errs = {};
    if (!form.token.trim()) errs.token = 'Reset token is required';
    if (!form.newPassword) errs.newPassword = 'New password is required';
    else if (form.newPassword.length < 8) errs.newPassword = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(form.newPassword)) errs.newPassword = 'Must contain at least 1 uppercase letter';
    else if (!/[a-z]/.test(form.newPassword)) errs.newPassword = 'Must contain at least 1 lowercase letter';
    else if (!/[0-9]/.test(form.newPassword)) errs.newPassword = 'Must contain at least 1 number';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword)) errs.newPassword = 'Must contain at least 1 special character';
    if (form.newPassword !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setFormErrors({});
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/reset-password`, {
        email, token: form.token, newPassword: form.newPassword,
      });
      setAlert({ type: 'success', msg: res.data.message });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Reset failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" data-testid="forgot-page">
      <form
        className="auth-card"
        onSubmit={step === 1 ? handleEmailSubmit : handleReset}
        noValidate
      >
        <h2>FORGOT PASSWORD</h2>
        <p className="auth-sub">
          {step === 1
            ? 'Enter your registered email to get a reset token'
            : 'Enter the token and your new password'}
        </p>

        {alert && (
          <div className={`auth-alert ${alert.type}`}>{alert.msg}</div>
        )}

        {step === 1 && (
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              placeholder="you@example.com"
              className={emailError ? 'error' : ''}
            />
            {emailError && <div className="error-text">{emailError}</div>}
          </div>
        )}

        {step === 2 && (
          <>
            {devToken && (
              <div className="dev-token-box">
                <i className="fa-solid fa-circle-info"></i>
                <strong> Dev Mode:</strong> Your reset token is <strong>{devToken}</strong>
                <br /><small>(In production this would be sent to your email)</small>
              </div>
            )}

            <div className="form-group">
              <label>Reset Token</label>
              <input
                type="text"
                value={form.token}
                onChange={(e) => setForm({ ...form, token: e.target.value })}
                placeholder="Enter 6-digit token"
                className={formErrors.token ? 'error' : ''}
              />
              {formErrors.token && <div className="error-text">{formErrors.token}</div>}
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                placeholder="At least 8 chars, A-a-1-!"
                className={formErrors.newPassword ? 'error' : ''}
              />
              {formErrors.newPassword && <div className="error-text">{formErrors.newPassword}</div>}
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Re-enter new password"
                className={formErrors.confirmPassword ? 'error' : ''}
              />
              {formErrors.confirmPassword && <div className="error-text">{formErrors.confirmPassword}</div>}
            </div>
          </>
        )}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Please wait…' : step === 1 ? 'Send Reset Token' : 'Reset Password'}
        </button>

        {step === 2 && (
          <button
            type="button"
            className="auth-btn"
            style={{ marginTop: 8, background: 'transparent', border: '1px solid #8e2de2', color: '#8e2de2' }}
            onClick={() => { setStep(1); setAlert(null); setDevToken(''); }}
          >
            ← Back
          </button>
        )}

        <div className="auth-switch">
          Remember your password? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
