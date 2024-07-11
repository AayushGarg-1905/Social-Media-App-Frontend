import { BASE_URL } from "./common.model";


export const ApiUrls = {
    getUser: BASE_URL + '/users/:id',
    followUser: BASE_URL + '/users/follow/:followerId',
    unfollowUser: BASE_URL + '/users/unfollow/:followerId',
    updateUser: BASE_URL + '/users/update',
    getFollowingList: BASE_URL + '/users/following/:userId/all',
    getFollowersList: BASE_URL + '/users/followers/:userId/all'
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

export interface UpdateUserResponse{
    msg:string
}

export interface GetFollowingListResponse{
    msg:string;
    data:{
        followingData:FollowingData[]
    }
}

export interface GetFollowersListResponse{
    msg:string;
    data:{
        followersData:FollowersData[]
    }
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
    totalPosts?:number;
    coverPicture:string;
    profilePicture:string;
}

export interface FollowingData{
    _id:string,
    userName:string,
    profilePicture:string
}

export interface FollowersData{
    _id:string,
    userName:string,
    profilePicture:string
}