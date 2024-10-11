import httpRequest from "../../../Services/http-request";

export const getOrders = async (page = 1, itemsPerPage = 4) => {
  const url = `/api/orders?page=${page}&limit=${itemsPerPage}`;
  const res = await httpRequest.get(url);
  // console.log(res.data);
  return res.data;
};
