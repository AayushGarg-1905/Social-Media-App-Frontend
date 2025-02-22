import axios, { AxiosResponse } from "axios";
import { ApiClient, UserModel } from "../internal_exports";
import Toast from "react-native-toast-message";

export default class UserService {
    protected apiClient: ApiClient.default;
    constructor() {
        this.apiClient = new ApiClient.default();
    }

    public async getUserData(
        accessToken:string | null,
        userId:string
    ){
        const getUserUrl = UserModel.ApiUrls.getUser.replace(':id', userId);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res: AxiosResponse<UserModel.GetUserResponse, any> | undefined;
        try {
            res = await this.apiClient.get<UserModel.GetUserResponse>(
                getUserUrl,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }

    public async followUser(
        accessToken: string | null,
        followerId: string
    ) {
        const followUserUrl = UserModel.ApiUrls.followUser.replace(':followerId',followerId);

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const request={};
        type TRequest = typeof request;
        let res: AxiosResponse<UserModel.FollowUserResponse, any> | undefined;
        try {
            res = await this.apiClient.post<TRequest, UserModel.FollowUserResponse>(
                followUserUrl,
                request,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }

    public async unfollowUser(
        accessToken: string | null,
        followerId: string
    ) {
        const unfollowUserUrl = UserModel.ApiUrls.unfollowUser.replace(':followerId',followerId);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const request={};
        type TRequest = typeof request;
        let res: AxiosResponse<UserModel.UnfollowUserResponse, any> | undefined;
        try {
            res = await this.apiClient.post<TRequest, UserModel.UnfollowUserResponse>(
                unfollowUserUrl,
                request,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }

    public async updateUser(
        accessToken: string | null,
        email?: string,
        userName?:string,
        phoneNumber?:number,
        profilePicture?:string,
        coverPicture?:string
    ) {
        const updateUserUrl = UserModel.ApiUrls.updateUser;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const request={
            email,
            userName,
            phoneNumber,
            profilePicture,
            coverPicture
        };

        type TRequest = typeof request;
        let res: AxiosResponse<UserModel.UpdateUserResponse, any> | undefined;
        try {
            res = await this.apiClient.put<TRequest, UserModel.UpdateUserResponse>(
                updateUserUrl,
                request,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }

    public async getFollowingList(
        accessToken:string | null,
        userId:string
    ){
        const getFollowingListUrl = UserModel.ApiUrls.getFollowingList.replace(':userId', userId);

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res: AxiosResponse<UserModel.GetFollowingListResponse, any> | undefined;
        try {
            res = await this.apiClient.get<UserModel.GetFollowingListResponse>(
                getFollowingListUrl,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }

    public async getFollowersData(
        accessToken:string | null,
        userId:string
    ){
        const getFollowersListUrl = UserModel.ApiUrls.getFollowersList.replace(':userId', userId);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res: AxiosResponse<UserModel.GetFollowersListResponse, any> | undefined;
        try {
            res = await this.apiClient.get<UserModel.GetFollowersListResponse>(
                getFollowersListUrl,
                config
            );
        } catch (err) {
            // ErrorHandler(err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occured',
                        text2: err.response.data.msg
                    })
                }
            }
        }
        return res;
    }
}