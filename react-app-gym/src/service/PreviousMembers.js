import axiosWithToken from "../utils/axiosWithToken";
export const allPreviousMember= async ()=>{
    return await axiosWithToken.get(`/api/previous-members`);
}