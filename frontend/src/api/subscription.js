import { api } from "./axios";

export const PostSubscription = async (phoneNumber, categories) => {
  return await api.post("/subscriptions", { phone: phoneNumber, categories });
};

export const GetAllSubscriptionByPhoneNumber = async (phoneNumber) => {
  return await api.get(`/subscriptions/${phoneNumber}`);
};

export const GetAllCategories = async () => {
  return await api.get("/subscriptions/categories");
};

export const DeleteCategory = async (categoryToDelete) => {
  return await api.delete("/subscriptions", {
    data: { category: categoryToDelete },
  });
};
