import axiosWithToken from "../utils/axiosWithToken.js";
export const addMember = async (memberDetails)=>{
    return await axiosWithToken.post(`/api/members`, memberDetails);
}

export const updateMember = async (memberDetails)=>{
    return await axiosWithToken.put(`/api/members`,memberDetails);
}

export const allMembers = async () =>{
    return await axiosWithToken.get('/api/members');
}

export const deleteMember = async (memberId) =>{
    return await axiosWithToken.delete(`/api/members/${memberId}`);
}