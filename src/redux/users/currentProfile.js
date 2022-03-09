import {createSlice} from '@reduxjs/toolkit'

const currentProfileSlice=createSlice({
    name:'currentProfile',
    initialState:{
        currentProfile:null
    },
    reducers:{
        setProfile:(state,action)=>{
            state.currentProfile=action.payload
        }
    }
})
export default currentProfileSlice.reducer
export const {setProfile}=currentProfileSlice.actions