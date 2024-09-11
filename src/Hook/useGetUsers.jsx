import { useQuery } from "react-query"
import { getUsers } from "../Pages/Dashboard/_api/Users-api"


export const useGetUsers = (page , itemsPerPage)=>{
    return useQuery({
        queryFn : () => getUsers(page , itemsPerPage),
        queryKey :["users" , page,itemsPerPage]
    })
}