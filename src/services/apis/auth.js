import apiConnector, { handleApiError } from "../apiConnector";


const AUTH_ENDPOINTS = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgotpassword',
    RESET_PASSWORD: '/auth/resetpassword', 
    VERIFY_EMAIL: '/auth/verify-email',    
    PROFILE: '/auth/profile',
};



export const authAPI = {

    register: async (data,naviagte) => {
        try {
            const response = await apiConnector.post(AUTH_ENDPOINTS.REGISTER, data);
            if(response?.success){
                naviagte('/login')
            }
        } catch (error) {
            handleApiErrorr(error);
        }
    },

    login: async (data) => {
        try {
            const response = await apiConnector.post(AUTH_ENDPOINTS.LOGIN, data);
            
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
            }
            
            return response;
        } catch (error) {
            handleApiError(error);
        }
    },

    logout: async () => {
        try {
            await apiConnector.post(AUTH_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.warn("Logout failed on server, cleaning up client anyway.");
        } finally {
            localStorage.removeItem('accessToken');
        }
    },

    verifyEmail: async (token) => {
        try {
            const response = await apiConnector.get(`${AUTH_ENDPOINTS.VERIFY_EMAIL}/${token}`);
            return response;
        } catch (error) {
            handleApiError(error);
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await apiConnector.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
            return response;
        } catch (error) {
            handleApiError(error);
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await apiConnector.put(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`, { password });
            return response;
        } catch (error) {
            handleApiError(error);
        }
    },

    getProfile: async () => {
        try {
            const response = await apiConnector.get(AUTH_ENDPOINTS.PROFILE);
            return response;
        } catch (error) {
            handleApiError(error);
        }
    }
};