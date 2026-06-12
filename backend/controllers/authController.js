const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper: generate JWT
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, fullName: user.fullName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check duplicate email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered. Please login instead.',
        code: 'EMAIL_ALREADY_EXISTS',
      });
    }

    const user = await User.create({ fullName, email, password });
    const token = signToken(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to JBL.',
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: 'Server error during signup.' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please sign up first.',
        code: 'USER_NOT_FOUND',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.',
        code: 'WRONG_PASSWORD',
      });
    }

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.fullName}!`,
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Security: don't reveal whether email exists
      return res.status(200).json({
        success: true,
        message: 'If that email is registered, a reset token has been generated.',
      });
    }

    // Generate a 6-digit OTP token (simulated — in production send via email)
    const resetToken = crypto.randomInt(100000, 999999).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save({ validateBeforeSave: false });

    // In production you'd email this token. Here we return it directly for demo.
    return res.status(200).json({
      success: true,
      message: 'Password reset token generated.',
      resetToken, // In production: send via email, remove from response
      note: 'In production, this token would be sent to your email. Use it within 15 minutes.',
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, token, and new password are required.' });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token. Please request a new one.',
      });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully! You can now login with your new password.',
    });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/auth/me  (protected)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
