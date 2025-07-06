import axios from "axios";

export const addInterestedMember = async (memberDetails) =>{
    return axios.post(`http://localhost:8080/interested`,memberDetails);
}

export const allInterstedMembers = async () =>{
    return axios.get(`http://localhost:8080/interested`);
}