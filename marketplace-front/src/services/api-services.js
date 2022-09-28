import {create} from './base-service';

const http = create({
  useAccessToken: false,
});

export const getOrdersContract = async () => {
  return await http.get(`/api/orders_contract`);
};

export const getOrders = async () => {
  return await http.get(`/api/orders`);
};

export const createOrder = async (data) => {
  return await http.post(`/api/create_order`, data);
};

export const updateOrder = async (data) => {
  return await http.post(`/api/update_order`, data);
};

export const deleteOrder = async (data) => {
  return await http.put(`/api/delete_order`, data);
};

export const getTokens = async () => {
  return await http.get(`/api/tokens`);
};

export const createNft = async (data) => {
  return await http.post(`/api/create_nft`, data);
};

export const getTokenContract = async () => {
  return await http.get(`/api/token_contract`);
};
