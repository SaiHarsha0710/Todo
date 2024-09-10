import { createSlice,configureStore } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:"auth",
    initialState:{user:"",isLoggedIn:false},
    reducers:{
        login(state) {            
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn=false;
        }
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer:authSlice.reducer,
});

/*
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Define the auth slice with a proper name and some basic reducers
const authSlice = createSlice({
    name: "auth", // Provide a meaningful name for the slice
    initialState: { user: "", isLoggedIn: false },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = "";
            state.isLoggedIn = false;
        }
    }
});

// Export the actions to use them in your components
export const authActions = authSlice.actions;

// Configure the Redux store with the auth slice reducer
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});
*/