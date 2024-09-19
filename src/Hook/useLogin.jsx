import { useMutation } from "react-query";



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