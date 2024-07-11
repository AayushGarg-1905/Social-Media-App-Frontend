import axios, { AxiosResponse } from 'axios';
import { ApiClient, AuthModel, PostModel } from '../internal_exports'
import { Gender } from '../models/common.model';
import Toast from 'react-native-toast-message';

export default class PostService {
  protected apiClient: ApiClient.default;
  constructor() {
    this.apiClient = new ApiClient.default()
  }

  public async getAllPosts(
    accessToken: string
  ) {
    const getAllPostsUrl = PostModel.ApiUrls.getAllPosts;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let res: AxiosResponse<PostModel.GetAllPostsResponse, any> | undefined;
    try {
      res = await this.apiClient.get<PostModel.GetAllPostsResponse>(
        getAllPostsUrl,
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

  public async createPost(
    accessToken?:string,
    caption?:string,
    imageUrl?:string
  ) {
    const createPostUrl = PostModel.ApiUrls.createPost;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {
      caption,
      imageUrl
    }
    type TRequest = typeof request;
    let res: AxiosResponse<PostModel.CreatePostResponse, any> | undefined;
    try {
      res = await this.apiClient.post<TRequest,PostModel.CreatePostResponse>(
        createPostUrl,
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

  public async deletePost(
    accessToken: string | null,
    postId:string
  ) {
    const deletePostUrl = (PostModel.ApiUrls.deletePost).replace(':postId',postId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    
    let res: AxiosResponse<PostModel.DeletePostResponse, any> | undefined;
    try {
      res = await this.apiClient.delete<PostModel.DeletePostResponse>(
        deletePostUrl,
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

  public async editPost(
    accessToken: string | null,
    postId:string,
    caption:string
  ) {
    const editPostUrl = (PostModel.ApiUrls.editPost).replace(':postId',postId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {
      caption
    }
    type TRequest = typeof request;
    
    let res: AxiosResponse<PostModel.EditPostResponse, any> | undefined;
    try {
      res = await this.apiClient.put<TRequest,PostModel.EditPostResponse>(
        editPostUrl,
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

  public async likePost(
    accessToken: string | null,
    postId:string,
  ) {
    const likePostUrl = (PostModel.ApiUrls.likePost).replace(':postId',postId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {}

    type TRequest = typeof request;
    
    let res: AxiosResponse<PostModel.LikePostResponse, any> | undefined;
    try {
      res = await this.apiClient.put<TRequest,PostModel.LikePostResponse>(
        likePostUrl,
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

  public async unlikePost(
    accessToken: string | null,
    postId:string,
  ) {
    const unlikePostUrl = (PostModel.ApiUrls.unlikePost).replace(':postId',postId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {}

    type TRequest = typeof request;
    
    let res: AxiosResponse<PostModel.UnlikePostResponse, any> | undefined;
    try {
      res = await this.apiClient.put<TRequest,PostModel.UnlikePostResponse>(
        unlikePostUrl,
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

  public async getAllUserPosts(
    accessToken: string | null,
    userId:string
  ) {
    const getAllUserPostsUrl = PostModel.ApiUrls.getAllUserPosts.replace(':userId',userId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let res: AxiosResponse<PostModel.GetAllUserPostsResponse, any> | undefined;
    try {
      res = await this.apiClient.get<PostModel.GetAllUserPostsResponse>(
        getAllUserPostsUrl,
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