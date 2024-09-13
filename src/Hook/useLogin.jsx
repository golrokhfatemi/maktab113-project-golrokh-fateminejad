import { useMutation } from "react-query";
import AdminloginApi from "../Pages/Dashboard/AdminLogin/_api/AdminLogin_api";


export const useLogin = () => {
    return useMutation({
        mutationKey : "login",
        mutationFn : (data) => {
            console.log(data);
            } ,

        onSuccess : () => {

        },
        onError : () => {

        }
    })
}