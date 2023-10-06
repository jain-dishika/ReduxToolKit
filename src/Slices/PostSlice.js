import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    posts: [],
    isLoading: false,
    error: null,
}
export const getPostData = (id) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingPostDataRequest());
          const response = await axios.get(`http://localhost:8047/users/${id}/posts`);
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingPostDataSuccess(data));
        } catch (error) {
          dispatch(fetchingPostDataFailure(error));
        }
    }
}
export const deletePostData = (index, id) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8047/users/${id}/posts/${index}`);
            dispatch(deletingThePost(index))
            console.log('Resource deleted successfully.', response.data);
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updatePostData = (index, description, id) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.put(`http://localhost:8047/users/${id}/posts/${index}`, {description});
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingPost({ id: response.data.id , details: {description}}));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addPostData = (id, description) =>{
    return async(dispatch) =>{
        try {
            await axios.post(`http://localhost:8047/users/${id}/posts`, {description});
            dispatch(addingPost({description}));
          } catch (error) {
            console.error('Error storing data:', error);
          }
    }
}
const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        fetchingPostDataRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        fetchingPostDataSuccess : (state, action) =>{
            return {
                ...state,
                posts : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingPostDataFailure : (state, action) =>{
            return {
                ...state,
                posts: [],
                isLoading: false,
                error: action.payload,
            };
        },
        deletingThePost : (state, action) =>{
            const updatedItems = state.posts.filter((item, index) => item.id !== action.payload);
            console.log(updatedItems);
            return {
                ...state,
                posts: updatedItems,
            }
        },
        updatingPost : (state, action) =>{
            // console.log("hello", action.payload);
            const updatedItems = state.posts.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            // console.log("hello11", updatedItems);
            return {
                ...state,
                posts: updatedItems,
            };
        },
        addingPost : (state, action) =>{
            // console.log("Inside Reducer", action.payload)
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        },
        
        
    }
})
export const {
    fetchingPostDataRequest, fetchingPostDataSuccess, fetchingPostDataFailure, deletingThePost, updatingPost,addingPost
} = postSlice.actions;

export default postSlice.reducer