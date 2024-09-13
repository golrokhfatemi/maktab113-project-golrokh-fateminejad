

import httpRequest from '../../../../services/http-request'

const AdminloginApi = async(values) => { 
    return  await httpRequest.post('/api/auth/login' ,values)
    

}
export default AdminloginApi
