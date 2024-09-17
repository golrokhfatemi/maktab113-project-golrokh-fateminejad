
import httpRequest from '../../../Services/http-request'



export const createProduct = async(formData) =>{
   
    try{
        const res = await httpRequest.post(`/api/products` ,formData)
 console.log(res);
 
 return res
    }catch(e){
        console.log(e.message);
        
    }
 
}