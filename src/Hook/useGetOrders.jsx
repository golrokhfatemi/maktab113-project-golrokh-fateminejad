import { useQuery } from "react-query"
import { getOrders} from "../Pages/Dashboard/_api/Orders-api"


export const useGetOrders = (page , itemsPerPage)=>{
    return useQuery({
        queryFn : () => getOrders(page , itemsPerPage),
        queryKey :["orders" , page,itemsPerPage]
    })
}