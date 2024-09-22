import httpRequest from "../../../Services/http-request";

export const getOrders = async () => {
  const url = `/api/orders`;
  const res = await httpRequest.get(url);
  // console.log(res.data);
  return res.data;
};
