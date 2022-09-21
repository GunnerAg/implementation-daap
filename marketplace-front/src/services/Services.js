import { create } from "./BaseService";

const http = create({
  useAccessToken: false,
});

// ORDER RELATED //
export const getOrdersContract = async () => {
  return await http.get(`/api/orders_contract`);
};

export const getOrders = async () => {
  return await http.get(`/api/orders`);
};

export const getUserOrders = async (data) => {
  return await http.get(`/api/orders`);
};

//address, idToken, amount, name, imgURL, rarity;
export const createOrder = async (data) => {
  return await http.post(`/api/create_order`, data);
};

//address, idToken, amount;
export const updateOrder = async (data) => {
  return await http.put(`/api/update_order`, data);
};

//address, idToken;
export const deleteOrder = async (data) => {
  return await http.put(`/api/delete_order`, data);
};

// TOKEN RELATED //
export const getTokens = async () => {
  return await http.get(`/api/tokens`);
};

//name, imgURL, rarity, id; 
export const createNft = async (data) => {
  return await http.post(`/api/create_nft`, data);
};

export const getTokenContract = async () => {
  return await http.get(`/api/token_contract`);
};

