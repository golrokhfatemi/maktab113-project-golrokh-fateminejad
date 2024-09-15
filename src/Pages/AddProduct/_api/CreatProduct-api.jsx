
import httpRequest from '../../../Services/http-request'



export const createProduct = async(values) =>{
    try{
        const res = await httpRequest.post(`/api/products` ,values)
 console.log(res);
 
 return res
    }catch(e){
        console.log(e.message);
        
    }
 
}