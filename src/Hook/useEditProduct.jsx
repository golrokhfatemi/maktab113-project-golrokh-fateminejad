import { useMutation } from "react-query";
import { editProduct } from "../Pages/Dashboard/_api/Products-api";


export default function useEditProduct() {
    return useMutation({
      mutationFn : (id) => editProduct(id),
      mutationKey :["edit"]
    })
  }