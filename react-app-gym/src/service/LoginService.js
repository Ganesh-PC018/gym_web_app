import axios from "axios"
import axiosWithToken from "../utils/axiosWithToken";
//http://localhost:8080
export const loginAdmin = async (loginDetails) =>{
    return await axiosWithToken.post(`/api/auth/login`,loginDetails, {
  withCredentials: true
});
}