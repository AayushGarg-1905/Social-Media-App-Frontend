import { BASE_URL } from "./common.model";

export const ApiUrls = {
    login: BASE_URL + '/auth/users/login',
    register: BASE_URL + '/auth/users/register'
}

export interface LoginResponse {
    msg:string,
    data?:{
        accessToken: string;
        userName: string;
        email: string;
        phoneNumber: number;
        gender: string;
        dateOfBirth?: string;
        address?: string;
        followers: string[];
        following: string[];
    }
    
}

export interface RegisterResponse{
    msg:string
}