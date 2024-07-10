import axios, { AxiosResponse } from 'axios';
import { ApiClient, AuthModel } from '../internal_exports'
import { Gender } from '../models/common.model';
import Toast from 'react-native-toast-message';

export default class AuthService {
  protected apiClient: ApiClient.default;
  constructor() {
    this.apiClient = new ApiClient.default()
  }

  public async register(
    userName: string,
    email: string,
    password: string,
    gender: string,
    phoneNumber: string
  ) {
    const registerUrl = AuthModel.ApiUrls.register;
    const request = {
      userName,
      email,
      password,
      gender: gender.toUpperCase(),
      phoneNumber: +phoneNumber
    };
    type TRequest = typeof request;
    let res: AxiosResponse<AuthModel.RegisterResponse, any> | undefined;
    console.log('register request is ', request)
    try {
      res = await this.apiClient.post<TRequest, AuthModel.RegisterResponse>(
        registerUrl,
        request,
      );
      console.log('res of register is ', res.data);
    } catch (err) {
      // ErrorHandler(err);
      if(axios.isAxiosError(err)){
        if(err.response){
          Toast.show({
            type:'error',
            text1:'Error occured',
            text2: err.response.data.msg
          })
        }
      }
    }
    return res;
  }

  public async login(
    email: string,
    password: string
  ) {
    const loginUrl = AuthModel.ApiUrls.login;
    const request = {
      email, password
    };
    type TRequest = typeof request;
    let res: AxiosResponse<AuthModel.LoginResponse, any> | undefined;

    try {
      res = await this.apiClient.post<TRequest, AuthModel.LoginResponse>(
        loginUrl,
        request,
      );
      console.log('res of login is ', res.data);
    } catch (err) {
      // ErrorHandler(err);
      if(axios.isAxiosError(err)){
        if(err.response){
          Toast.show({
            type:'error',
            text1:'Error occured',
            text2: err.response.data.msg
          })
        }
      }
    }
    return res;
  }

  public async checkLogin(
    accessToken:string
  ) {
    const checkLoginUrl = AuthModel.ApiUrls.checkLogin;
    const config = {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  };

    let res: AxiosResponse<AuthModel.CheckLoginResponse, any> | undefined;

    try {
      res = await this.apiClient.get<AuthModel.CheckLoginResponse>(
        checkLoginUrl,
        config,
      );
      console.log('res of checkLogin is ', res.data);
    } catch (err) {
      // ErrorHandler(err);
      if(axios.isAxiosError(err)){
        if(err.response){
          Toast.show({
            type:'error',
            text1:'Error occured',
            text2: err.response.data.msg
          })
        }
      }
    }
    return res;
  }

  public async logout(
    accessToken:string
  ) {
    const logoutUrl = AuthModel.ApiUrls.logout;
    const request = {};
    const config = {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  };
    type TRequest = typeof request;
    let res: AxiosResponse<AuthModel.LogoutResponse, any> | undefined;

    try {
      res = await this.apiClient.post<TRequest, AuthModel.LogoutResponse>(
        logoutUrl,
        request,
        config
      );
      console.log('res of logout is ', res.data);
    } catch (err) {
      // ErrorHandler(err);
      if(axios.isAxiosError(err)){
        if(err.response){
          Toast.show({
            type:'error',
            text1:'Error occured',
            text2: err.response.data.msg
          })
        }
      }
    }
    return res;
  }
}