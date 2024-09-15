import { useMutation } from "react-query";
import { createProduct } from "../Pages/AddProduct/_api/CreatProduct-api";


export default function useCreateProduct() {
  return useMutation({
    mutationFn:(newProduct)=>createProduct(newProduct),
    mutationKey:["create"]
  })
}
