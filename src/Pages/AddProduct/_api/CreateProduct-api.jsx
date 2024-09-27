
import Cookies from "js-cookie";
import httpRequest from "../../../Services/http-request";

export const createProduct = async(formData) =>{
    const token = Cookies.get("accessToken"); 
    console.log('Token:', token);
    try{
        const res = await httpRequest.post(`/api/products` ,formData )
 console.log(res);
 
 return res
    }catch(e){
        console.log(e.message);
        
    }
 
}