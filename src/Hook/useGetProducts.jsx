import { useQuery } from "react-query"
import { getProducts } from "../Pages/Dashboard/_api/Products-api"

export const useGetProducts = ({page, itemsPerPage, category}) => {
  // console.log({page,itemsPerPage,category});
  
  return useQuery({
    queryFn: () => getProducts({page, itemsPerPage, category}),
    queryKey: ["products", page, itemsPerPage, category],
  });
};