export function validatePhoneAndCategories(req, res, next) {
  const { phone, categories } = req.body;

  // Validations hardcoded
  const validCategories = ['sports', 'movies', 'technology', 'music', 'games'];
  const phoneRegex = /^\+\d{10,15}$/;

  try {
    // VALIDATIONS
    const isPhoneValid = phoneRegex.test(phone);

    if (!isPhoneValid) {
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
      msg: 'Something went wrongd',
      data: { error },
    });
  }
}
