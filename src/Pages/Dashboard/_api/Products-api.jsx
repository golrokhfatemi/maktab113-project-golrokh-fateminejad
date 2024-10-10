import httpRequest from "../../../Services/http-request";

export const getProducts = async (page = 1, itemsPerPage = 4, category) => {
  const url = `/api/products?page=${page}&limit=${itemsPerPage}${
    category && `&category=${category}`
  }`;
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

export const editProduct = async(id , formData) => {
  console.log(id);  
try{ 
  console.log(formData.thumbnail);
  const t = formData.get("thumbnail")
  if(!(t instanceof File)){
    formData.delete("thumbnail")
  }
const res = await httpRequest.patch(`/api/products/${id}/` , formData)
return res
}catch(e){
console.log(e.message);

}
}