import axios from 'axios';

import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    deleteComplainRequest,
    deleteComplainSuccess,
    deleteComplainFail,
} from './complainSlice';


// =============================
// FETCH ALL COMPLAINS
// =============================
export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
        );

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};


// =============================
// DELETE COMPLAIN
// =============================
export const deleteComplain = (id) => async (dispatch) => {
    dispatch(deleteComplainRequest());

    try {
        // FIXED URL — THIS MUST MATCH YOUR BACKEND ROUTE
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete/${id}`);

        dispatch(deleteComplainSuccess(id));   // Remove from UI
    } catch (error) {
        dispatch(deleteComplainFail(
            error.response?.data?.message || error.message
        ));
    }
};
