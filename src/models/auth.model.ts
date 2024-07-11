import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    login: BASE_URL + '/auth/users/login',
    register: BASE_URL + '/auth/users/register',
    checkLogin: BASE_URL + '/auth/users/check-login',
    logout: BASE_URL + '/auth/users/logout'
}

export interface LoginResponse {
    msg:string,
    data?:{
        userData:AuthData
    }
}

export interface CheckLoginResponse {
    msg:string,
    data?:{
        userData:AuthData
    }
}

export interface RegisterResponse{
    msg:string
}

export interface LogoutResponse{
    msg:string
}


export interface AuthData{
    accessToken:string;
    userId:string;
}