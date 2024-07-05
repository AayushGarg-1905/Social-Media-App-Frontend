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