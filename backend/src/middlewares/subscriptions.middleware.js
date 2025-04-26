import { validCategories } from '../utils/enviroment.js';

function isPhoneNumberValid(phone) {
  const phoneRegex = /^\+\d{10,15}$/;
  return phoneRegex.test(phone);
}

export function validatePhoneNumber(req, res, next) {
  const { phoneNumber } = req.params;

  try {
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
    if (!isPhoneNumberValid(phone)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Phone number not valid. Should be in an international format (e.g. +1234567890)',
        data: {},
      });
    }

    const areCategoriesValid = Array.isArray(categories) && categories.length > 0 && categories.every((cat) => validCategories.includes(cat));

    if (!areCategoriesValid) {
      return res.status(400).json({
        status: 'Error',
        message: 'Categories not valid',
        data: {
          categoriesAvailable: validCategories,
        },
      });
    }

    // DTO
    req.subscriptionBody = {
      phone,
      categories,
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
