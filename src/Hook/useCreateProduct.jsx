import { useMutation } from "react-query";
import { createProduct } from "../Pages/AddProduct/_api/CreateProduct-api";


export default function useCreateProduct() {
  return useMutation({
    mutationFn:(newProduct)=>createProduct(newProduct),
    mutationKey:["create"]
  })
}
