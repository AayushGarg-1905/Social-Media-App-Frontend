import { BASE_URL } from "./common.model";


export const ApiUrls = {
    getUser: BASE_URL + '/users/:id',
    followUser: BASE_URL + '/users/follow/:followerId',
    unfollowUser: BASE_URL + '/users/unfollow/:followerId'
}

export interface FollowUserResponse{
    msg:string
}

export interface UnfollowUserResponse{
    msg:string
}

export interface GetUserResponse{
    msg:string;
    data:UserData;
}

export interface UserData {
    accessToken: string;
    userId:string;
    userName: string;
    email: string;
    phoneNumber: number;
    gender: string;
    dateOfBirth?: string;
    address?: string;
    followers: string[];
    following: string[];
    coverPicture:string;
    profilePicture:string;
}