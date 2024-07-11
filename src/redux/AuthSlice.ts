import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthModel, UserModel } from "../internal_exports";


type InitialState = {
    data: null | AuthModel.AuthData
}
const initialState:InitialState ={
    data:null
}
const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthData(state,action:PayloadAction<AuthModel.AuthData | null>){
            state.data = action.payload
        }
    }
})

export const {setAuthData} = AuthSlice.actions;
export default AuthSlice.reducer;