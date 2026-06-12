// Server-side validation rules for login/signup
const { body, validationResult } = require('express-validator');

const signupValidation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Full name must be 3-50 characters')
    .matches(/^[A-Za-z\s]+$/).withMessage('Full name can only contain letters and spaces'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least 1 number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least 1 special character'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords do not match');
      return true;
    }),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = {};
    errors.array().forEach((e) => {
      if (!formatted[e.path]) formatted[e.path] = e.msg;
    });
    return res.status(400).json({ success: false, errors: formatted });
  }
  next();
};

module.exports = { signupValidation, loginValidation, handleValidation };
