import { UserModel } from "../internal_exports";
import { BASE_URL } from "./common.model";

export const ApiUrls = {
    createComment: BASE_URL + '/comments/create/:postId',
    getAllComments: BASE_URL + '/comments/all/:postId',
    deleteComment: BASE_URL + '/comments/delete/:commentId',
    editComment: BASE_URL + '/comments/update/:commentId'
}

export interface CreateCommentResponse{
    msg:string
}

export interface GetAllCommentsResponse{
    msg:string;
    data:CommentData[]
}

export interface DeleteCommentResponse{
    msg:string
}

export interface EditCommentResponse{
    msg:string
}

export interface CommentData{
    commentId:string,
    text:string,
    userId:string,
    userName:string,
    userProfilePicture:string,
    createdAt:string,
    
}