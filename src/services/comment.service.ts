import axios, { AxiosResponse } from "axios";
import { ApiClient, CommentModel } from "../internal_exports";
import { CreateCommentResponse } from "../models/comment.model";
import Toast from "react-native-toast-message";

export default class CommentService {
    protected apiClient: ApiClient.default;
    constructor() {
        this.apiClient = new ApiClient.default();
    }

    public async createComment(
        accessToken: string | null,
        postId: string,
        comment: string
    ) {
        const createCommentUrl = CommentModel.ApiUrls.createComment.replace(':postId', postId);

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const request = {
            text: comment
        }

        type TRequest = typeof request;
        let res: AxiosResponse<CommentModel.CreateCommentResponse, any> | undefined;
        try {
            res = await this.apiClient.post<TRequest, CommentModel.CreateCommentResponse>(
                createCommentUrl,
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

    public async getAllComments(
        accessToken: string | null,
        postId: string,
    ) {
        const getAllCommentsUrl = CommentModel.ApiUrls.getAllComments.replace(':postId', postId);

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res: AxiosResponse<CommentModel.GetAllCommentsResponse, any> | undefined;
        try {
            res = await this.apiClient.get<CommentModel.GetAllCommentsResponse>(
                getAllCommentsUrl,
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

    public async deleteComment(
        accessToken: string | null,
        commentId:string
      ) {
        const deleteCommentUrl = (CommentModel.ApiUrls.deleteComment).replace(':commentId',commentId);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        let res: AxiosResponse<CommentModel.DeleteCommentResponse, any> | undefined;
        try {
          res = await this.apiClient.delete<CommentModel.DeleteCommentResponse>(
            deleteCommentUrl,
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

      public async editComment(
        accessToken: string | null,
        comment:string,
        commentId:string
      ) {
        const editCommentUrl = (CommentModel.ApiUrls.editComment).replace(':commentId',commentId);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
    
        const request = {
          text:comment
        }
    
        type TRequest = typeof request;
        
        let res: AxiosResponse<CommentModel.EditCommentResponse, any> | undefined;
        try {
          res = await this.apiClient.put<TRequest,CommentModel.EditCommentResponse>(
            editCommentUrl,
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

}