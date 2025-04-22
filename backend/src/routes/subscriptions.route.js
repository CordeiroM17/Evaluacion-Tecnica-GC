import express from 'express';
import { subscriptionsController } from '../controllers/subscriptions.controller.js';
import { validatePhoneAndCategories } from '../middlewares/subscriptions.middleware.js';

export const subscriptionsRouter = express.Router();

subscriptionsRouter.post('/', validatePhoneAndCategories, subscriptionsController.postSubscription);
