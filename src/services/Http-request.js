import axios from "axios";
import { BASE_URL } from "../Constant";



const httpRequest = axios.create({
    baseURL : BASE_URL ,
})


    

export default httpRequest