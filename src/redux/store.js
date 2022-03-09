import { configureStore } from "@reduxjs/toolkit";
import user from './users/user'
import posts from './posts/posts'
import profile from './users/currentProfile'
const store = configureStore({
    reducer:{
        user,posts,profile
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck: false})
})
export default store