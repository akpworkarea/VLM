export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validatePincode = (pincode: string): boolean => {
  const re = /^\d{6}$/;
  return re.test(pincode);
};

export const required = (value: any): string | undefined => {
  if (value === undefined || value === null || value === '') {
    return 'This field is required';
  }
  return undefined;
};
