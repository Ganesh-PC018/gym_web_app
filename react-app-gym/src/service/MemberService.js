import axios from 'axios'

export const addMember = async (memberDetails)=>{
    return await axios.post(`http://localhost:8080/members`,memberDetails);
}
export const updateMember = async (memberDetails)=>{
    return await axios.put(`http://localhost:8080/members`,memberDetails);
}

export const allMembers = async () =>{
    return await axios.get('http://localhost:8080/members');
}

export const deleteMember = async (memberId) =>{
    return await axios.delete(`http://localhost:8080/members/${memberId}`);
}