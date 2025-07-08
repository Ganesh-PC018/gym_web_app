import axiosWithToken from "../utils/axiosWithToken";
// import axios from "axios";
// const BASE_URL = `http://localhost:8080`
export const addInterestedMember = async (memberDetails) =>{
    return axiosWithToken.post(`/api/interested`,memberDetails);
}

export const allInterstedMembers = async () =>{
    return axiosWithToken.get(`/api/interested`);
}