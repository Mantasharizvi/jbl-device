const express = require('express');
const router = express.Router();
const {
  signup, login, forgotPassword, resetPassword, getMe,
} = require('../controllers/authController');
const {
  signupValidation, loginValidation, handleValidation,
} = require('../middleware/validators');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signupValidation, handleValidation, signup);
router.post('/login', loginValidation, handleValidation, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
