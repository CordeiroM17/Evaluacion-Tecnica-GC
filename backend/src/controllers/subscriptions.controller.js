import { subscriptionService } from '../services/subscriptions.service.js';

export const subscriptionsController = {
  postSubscription: async function (req, res) {
    const { phone, categories } = req.subscriptionBody;
    try {
      const subscriptionCreated = await subscriptionService.createSubscription(phone, categories);

      return res.status(201).json({
        status: 'Success',
        message: 'Subscription created',
        data: subscriptionCreated,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },

  getAllSubscriptionByPhoneNumber: async function (req, res) {
    const { phoneNumber } = req.phoneNumber;
    const userPhone = req.user.phone;

    try {
      if (phoneNumber !== userPhone) {
        return res.status(404).json({
          status: 'Error',
          message: 'User phone not found',
          data: {},
        });
      }

      const subscriptionsFound = await subscriptionService.getSubscriptionsByPhone(phoneNumber);

      return res.status(200).json({
        status: 'Success',
        message: 'All subscriptions for number, ' + phoneNumber,
        data: subscriptionsFound,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },

  getAllCategories: async function (req, res) {
    try {
      const allCategories = await subscriptionService.categories();

      return res.status(200).json({
        status: 'Success',
        message: 'All categories available',
        data: allCategories,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },

  deleteCategory: async function (req, res) {
    const { id } = req.user;
    const { category } = req.categoryToDelete;

    try {
      const categoryDeleted = await subscriptionService.deleteCategory(id, category);

      return res.status(200).json({
        status: 'Success',
        message: 'Deleted',
        data: categoryDeleted,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },
};
