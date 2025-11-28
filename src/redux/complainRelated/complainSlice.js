import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complainsList: [],
    loading: false,
    error: null,
    response: null,
};

const complainSlice = createSlice({
    name: 'complain',
    initialState,
    reducers: {

        // ==== GET ALL COMPLAINS ====
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.complainsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ==== DELETE COMPLAIN ====
        deleteComplainRequest: (state) => {
            state.loading = true;
        },
        deleteComplainSuccess: (state, action) => {
            state.loading = false;
            state.complainsList = state.complainsList.filter(
                (item) => item._id !== action.payload
            );
        },
        deleteComplainFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    deleteComplainRequest,
    deleteComplainSuccess,
    deleteComplainFail
} = complainSlice.actions;

export const complainReducer = complainSlice.reducer;
