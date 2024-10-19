import React, {createContext, useEffect, useReducer} from "react";
import axios from "axios";



// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
}

// Manage the user state
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'REFRESH_TOKEN':
            localStorage.setItem('accessToken', action.payload.accessToken);
            return {...state, accessToken: action.payload.accessToken,};
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { ...state, user: null, token: null };
        case 'UPDATE_USER':
            return { ...state, user: { ...state.user, ...action.payload } };
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, error: null };
        case 'REGISTER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ERROR_DISMISS':
            return { ...state, loading: false, error: null };
        default:
            return state;
    }

};


export const GlobalContext = createContext(undefined);

// Provider component
export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //
    // useEffect(() => {
    //     const verifyToken = async () => {
    //         const token = localStorage.getItem('accessToken');
    //         if (token) {
    //             try {
    //                 // Pass the refresh token in the body of the request
    //                 const refreshToken = localStorage.getItem('refreshToken'); // Ensure you store the refresh token
    //                 const response = await axios.post('http://localhost:3000/refresh', { refreshToken });
    //
    //                 // Dispatch new access token
    //                 dispatch({ type: 'REFRESH_TOKEN', payload: { accessToken: response.data.accessToken } });
    //             } catch (error) {
    //                 console.error('Token refresh failed:', error.response?.data || error.message);
    //                 dispatch({ type: 'LOGOUT' });
    //             }
    //         }
    //     };
    //
    //     verifyToken();
    // }, []);


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>

    );
};