import httpRequest from "../../../../Services/http-request";

const AdminloginApi = async (values) => {
  return await httpRequest.post("/api/auth/login", values);
};
export default AdminloginApi;
