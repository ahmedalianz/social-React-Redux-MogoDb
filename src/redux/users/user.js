import {createSlice} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        editUser:(state,action)=>{
            state.user=action.payload.user
            if (action.payload.remembered) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
              } else {
                sessionStorage.setItem("isLoggedIn", true);
                sessionStorage.setItem("currentUser", JSON.stringify(action.payload.user));
              }
        },
        loginFail:(state)=>{
            state.user=null
        },
        logOut:(state)=>{
            state.user=null
        }
    }
})
export default authSlice.reducer
export const {loginFail,editUser,logOut}=authSlice.actions