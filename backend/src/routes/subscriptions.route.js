import express from 'express';
import { subscriptionsController } from '../controllers/subscriptions.controller.js';
import { validatePhoneAndCategories, validatePhoneNumber } from '../middlewares/subscriptions.middleware.js';
import { validateToken } from '../middlewares/login.middleware.js';

export const subscriptionsRouter = express.Router();

subscriptionsRouter.post('/', validateToken, validatePhoneAndCategories, subscriptionsController.postSubscription);

subscriptionsRouter.get('/categories', subscriptionsController.getAllCategories);

subscriptionsRouter.get('/:phoneNumber', validateToken, validatePhoneNumber, subscriptionsController.getAllSubscriptionByPhoneNumber);
