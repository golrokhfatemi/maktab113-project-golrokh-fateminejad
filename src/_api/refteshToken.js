import httpRequest from "../Services/Http-request";



export const refreshToken = async(refresh) => {
    console.log(refresh);
    
    return await httpRequest.post('/api/auth/token' , {
        refresh
    })
    
}

