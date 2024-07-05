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
    console.log('accessToken in service is ', accessToken);
    let res: AxiosResponse<PostModel.GetAllPostsResponse, any> | undefined;
    try {
      res = await this.apiClient.get<PostModel.GetAllPostsResponse>(
        getAllPostsUrl,
        config
      );
      console.log('res of getAllPosts is ', res.data);
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
      console.log('res of createPost is ', res.data);
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