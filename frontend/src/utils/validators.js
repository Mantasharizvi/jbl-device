// Client-side validation helpers (mirrors server rules)
export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!re.test(email.trim())) return 'Please provide a valid email';
  return '';
};

export const validateFullName = (name) => {
  if (!name || !name.trim()) return 'Full name is required';
  if (name.trim().length < 3 || name.trim().length > 50)
    return 'Full name must be 3-50 characters';
  if (!/^[A-Za-z\s]+$/.test(name.trim()))
    return 'Full name can only contain letters and spaces';
  return '';
};

export const validatePassword = (pwd) => {
  if (!pwd) return 'Password is required';
  if (pwd.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(pwd)) return 'Must contain at least 1 uppercase letter';
  if (!/[a-z]/.test(pwd)) return 'Must contain at least 1 lowercase letter';
  if (!/[0-9]/.test(pwd)) return 'Must contain at least 1 number';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return 'Must contain at least 1 special character';
  return '';
};

export const validateConfirmPassword = (pwd, confirm) => {
  if (!confirm) return 'Confirm password is required';
  if (pwd !== confirm) return 'Passwords do not match';
  return '';
};
