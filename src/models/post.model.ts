import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    getAllPosts: BASE_URL + '/posts/all',
    createPost: BASE_URL + '/posts/create',
    deletePost: BASE_URL + '/posts/delete/:postId',
    editPost: BASE_URL + '/posts/update/:postId'
}

export interface GetAllPostsResponse {
    msg:string,
    data?:{
        postsData:PostData[]
    }
}

export interface CreatePostResponse {
    msg:string,
    data?: PostData
}

export interface DeletePostResponse {
    msg:string
}

export interface EditPostResponse {
    msg:string
}

export interface PostData {
    postId:string;
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