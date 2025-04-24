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

    try {
      const subscriptionsFound = await subscriptionService.getSubscriptionsByPhone(phoneNumber);

      if (subscriptionsFound.categories.length == 0) {
        return res.status(200).json({
          status: 'Success',
          message: `Phone number ${phoneNumber} doesn't have subscriptions yet`,
          data: subscriptionsFound,
        });
      }

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
};
