import axios from "axios";

export const loginAdmin = async (loginDetails) =>{
    return await axios.post(`http://localhost:8080/login/check`,loginDetails);
}