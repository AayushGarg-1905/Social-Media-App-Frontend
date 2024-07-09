import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    getAllPosts: BASE_URL + '/posts/all',
    getAllUserPosts: BASE_URL + '/posts/all/:userId',
    createPost: BASE_URL + '/posts/create',
    deletePost: BASE_URL + '/posts/delete/:postId',
    editPost: BASE_URL + '/posts/update/:postId',
    likePost: BASE_URL + '/posts/like/:postId',
    unlikePost: BASE_URL + '/posts/unlike/:postId' 
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

export interface LikePostResponse {
    msg:string
}

export interface UnlikePostResponse {
    msg:string
}

export interface GetAllUserPostsResponse {
    msg:string,
    data?:{
        postsData:PostData[]
    }
}

export interface PostData {
    postId:string;
    caption: string | null | undefined;
    userName: string;
    userId: string;
    likes: string[];
    comments: PostCommentMetaData[];
    imageUrl: string | null | undefined;
    createdAt:string
}

export interface PostCommentMetaData{
    commentId:string;
    userId:string
}

export interface RegisterResponse{
    msg:string
}