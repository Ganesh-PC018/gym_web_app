import axiosWithToken from "../utils/axiosWithToken.js";
// import axios from "axios";
export const updateFees = async (feeDetails) => {
    console.log("FeesDetails :",feeDetails);
    return axiosWithToken.post("/fees", feeDetails);
};

export const allFees = async () => {
    return axiosWithToken.get("/fees");
};