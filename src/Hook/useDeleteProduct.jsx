import { useMutation } from "react-query";
import { deleteProduct } from "../Pages/Dashboard/_api/Products-api";


export default function useDeleteProduct() {
    return useMutation({
      mutationFn : (id) => deleteProduct(id),
      mutationKey :["delete"]
    })
  }