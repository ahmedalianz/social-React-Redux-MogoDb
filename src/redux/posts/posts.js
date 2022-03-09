import {createSlice} from '@reduxjs/toolkit'

const postsSlice=createSlice({
    name:'posts',
    initialState:{
        posts:[]
    },
    reducers:{
        setPostsInStore:(state,action)=>{
            state.posts=action.payload
        },
        addPost:(state,action)=>{
            state.posts=[action.payload.newPost,...action.payload.posts]            
        }
    }
})
export default postsSlice.reducer
export const {setPostsInStore,addPost}=postsSlice.actions