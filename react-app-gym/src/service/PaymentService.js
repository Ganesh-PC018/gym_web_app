// src/components/service/PaymentService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/payments'; // Adjust this to your actual API URL

export const getAllPayments = () => {
    return axios.get(API_URL);
};

// Add this new function to update the payment status
export const updatePaymentStatus = (paymentData) => {
    console.log(paymentData);
    // The endpoint might be something like '/update' or you might use a PUT request
    // to a specific resource. Adjust the URL and method as per your API design.
    return axios.put(`${API_URL}`, paymentData);
};