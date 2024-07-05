import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    login: BASE_URL + '/auth/users/login',
    register: BASE_URL + '/auth/users/register'
}

export interface LoginResponse {
    msg:string,
    data?:{
        userData:UserModel.UserData
    }
    
}

export interface RegisterResponse{
    msg:string
}