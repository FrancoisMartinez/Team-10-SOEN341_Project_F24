import React, {createContext, useReducer} from "react";

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

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>

    );
};