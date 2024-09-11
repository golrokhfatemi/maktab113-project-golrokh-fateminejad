import httpRequest from "../../../services/http-request";


export const getUsers = async(page = 1 , itemsPerPage = 2) => {
    const url = `/api/users?page=${page}&limit=${itemsPerPage}`
    const res = await httpRequest.get(url)
    console.log(res.data);
    return res.data

}