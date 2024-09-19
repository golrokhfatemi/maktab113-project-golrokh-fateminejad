import { useMutation } from "react-query";
import httpRequest from "../Services/http-request";



export const useLogin = () => {
    return useMutation({
        mutationKey : "login",
        mutationFn :async (data) => {
          const res =  await httpRequest.post("/api/auth/login" ,data)
          return res.data
            } ,

        onSuccess : () => {

        },
        onError : () => {

        }
    })
}