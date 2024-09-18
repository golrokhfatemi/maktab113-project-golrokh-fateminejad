import httpRequest from "../../../Services/http-request";

export const getProducts = async (page = 1, itemsPerPage = 2) => {
  const url = `/api/products?page=${page}&limit=${itemsPerPage}`;
  const res = await httpRequest.get(url);
  // console.log(res.data);
  return res.data;
};


export const deleteProduct = async(id) => {
    console.log(id);  
try{ 
 const res = await httpRequest.delete(`/api/products/${id}/`)
 return res
}catch(e){
console.log(e.message);

}
}