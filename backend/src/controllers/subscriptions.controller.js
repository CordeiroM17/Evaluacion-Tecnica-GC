import { subscriptionService } from '../services/subscriptions.service.js';

export const subscriptionsController = {
  postSubscription: async function (req, res) {
    const { phone, categories } = req.subscriptionBody;
    try {
      const subscriptionCreated = await subscriptionService.createSubscription(phone, categories);

      return res.status(201).json({
        status: 'Success',
        msg: 'Subscription created',
        data: { subscriptionCreated },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrongd',
        data: { error },
      });
    }
  },
};
