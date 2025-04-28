import { validCategories } from '../utils/enviroment.js';

export function isPhoneNumberValid(phone) {
  const phoneRegex = /^\+\d{10,15}$/;
  return phoneRegex.test(phone);
}

export function validatePhoneNumber(req, res, next) {
  const { phoneNumber } = req.params;

  try {
    // Verify if in the req.params exist phone
    if (!phoneNumber) {
      return res.status(400).json({
        status: 'Error',
        message: 'Phone number required',
        data: {},
      });
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Phone number not valid. Should be in an international format (e.g. +1234567890)',
        data: {},
      });
    }

    // DTO
    req.phoneNumber = {
      phoneNumber,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
      data: { error },
    });
  }
}

export function validatePhoneAndCategories(req, res, next) {
  const { phone, categories } = req.body;

  try {
    // Verify if in the req.body exist phone
    if (!phone || !categories) {
      return res.status(400).json({
        status: 'Error',
        message: 'Phone number and categories required',
        data: {},
      });
    }

    if (!isPhoneNumberValid(phone)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Phone number not valid. Should be in an international format (e.g. +1234567890)',
        data: {},
      });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'Categories must be a non-empty array',
        data: {},
      });
    }

    // DTO
    req.subscriptionBody = { phone, categories };
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
      data: { error },
    });
  }
}
