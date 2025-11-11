import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 3 characters',
    }),

  age: Joi.number()
    .min(18)
    .max(60)
    .required()
    .messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least 18',
      'number.max': 'Age must not exceed 60',
      'any.required': 'Age is required',
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'string.empty': 'Please select gender',
      'any.only': 'Gender must be male, female, or other',
    }),

  experience: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Experience must be a number',
      'any.required': 'Experience is required',
    }),

  mobileNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Enter a valid 10-digit mobile number',
      'any.required': 'Mobile number is required',
    }),

  address: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Address is required',
      'string.min': 'Address must be at least 3 characters',
    }),

  city: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': 'City is required',
      'string.min': 'City must be at least 2 characters',
    }),

  role: Joi.string()
    .valid('labour', 'contractor')
    .required()
    .messages({
      'any.only': 'Role must be labour or contractor',
      'any.required': 'Role is required',
    }),
});
