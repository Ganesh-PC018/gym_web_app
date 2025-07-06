import axios from 'axios';

// The base URL for your backend API
const API_URL = 'http://localhost:8080/fees';

export const updateFees = async (feeDetails) => {
    // We use a POST request here as per your original code.
    // A PUT or PATCH request might also be appropriate depending on your API design.
    console.log("FeesDetails :",feeDetails);
    return axios.post(API_URL, feeDetails);
};


export const allFees = async () => {
    return axios.get(API_URL);
};
