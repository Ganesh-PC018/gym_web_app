import axiosWithToken from "../utils/axiosWithToken";
export const getAllPayments = () => {
    return axiosWithToken.get("/api/payments");
};

export const updatePaymentStatus = (paymentData) => {
   return axiosWithToken.put("/api/payments",paymentData);
};