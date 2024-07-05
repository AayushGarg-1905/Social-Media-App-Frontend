import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    getAllPosts: BASE_URL + '/posts/all',
    // register: BASE_URL + '/auth/users/register'
}

export interface GetAllPostsResponse {
    msg:string,
    data?:{
        postsData:PostData[]
    }
}

export interface PostData {
    caption: string | null | undefined;
    userName: string;
    userId: string;
    likes: string[];
    comments: string[];
    imageUrl: string | null | undefined;
    createdAt:string
}

export interface RegisterResponse{
    msg:string
}