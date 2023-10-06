import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./Slices/UserSlice";
import PostSlice from "./Slices/PostSlice";

const store  = configureStore({
    reducer:{
        usersList : UserSlice,
        postList : PostSlice
    }
});
export default store;