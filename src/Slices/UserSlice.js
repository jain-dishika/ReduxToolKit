import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    users: [],
    isLoading: false,
    error: null,
}
export const getUsersData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingDataRequest());
          const response = await axios.get('http://localhost:8047/users/');
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingDataSuccess(data));
        } catch (error) {
          dispatch(fetchingDataFailure(error));
        }
    }
}

export const deleteUserData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8047/users/${index}`);
            dispatch(deletingTheUser(index))
            console.log('Resource deleted successfully.', response.data);
          } catch (error) {
            console.log('Error deleting resource: ' + error.message);
          }
    }
}

export const updateUserData = (id, name, email, dateOfBirth) =>{
    return async(dispatch) =>{
        try {
            let details = { name, email, dateOfBirth };
            const response = await axios.put(`http://localhost:8047/users/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingUser({ id: id, details: details }));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addUserData = (name, email, dateOfBirth) =>{
    return async(dispatch) =>{
        try {
            await axios.post('http://localhost:8047/users/entry', {name, email, dateOfBirth});
            dispatch(addingUser({ name, email, dateOfBirth }));
          } catch (error) {
            console.error('Error storing data:', error);
          }
    }
}
const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        fetchingDataRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        fetchingDataSuccess : (state, action) =>{
            return {
                ...state,
                users : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingDataFailure : (state, action) =>{
            return {
                ...state,
                users: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingUser : (state, action) =>{
            // console.log("Inside Reducer", action.payload)
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        },
        deletingTheUser : (state, action) =>{
            const updatedItems = state.users.filter((item, index) => item.id !== action.payload);
            console.log(updatedItems);
            return {
                ...state,
                users: updatedItems,
            }
        },
        updatingUser : (state, action) =>{
            console.log("hello", action.payload);
            const updatedItems = state.users.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            console.log("hello", updatedItems);
            return {
                ...state,
                users: updatedItems,
            };
        }
    }
})
export const {
    addingUser, deletingTheUser, updatingUser, fetchingDataRequest, fetchingDataSuccess, fetchingDataFailure
} = userSlice.actions;
export default userSlice.reducer;
  