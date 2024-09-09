import { useQuery } from "react-query"
import { getProducts } from "../Pages/Dashboard/_api/Products-api"

export const useGetProducts = (page , itemsPerPage)=>{
    return useQuery({
        queryFn : () => getProducts(page , itemsPerPage),
        queryKey :["products" , page,itemsPerPage]
    })
}