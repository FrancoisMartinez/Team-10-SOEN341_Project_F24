import React, {createContext, useReducer} from "react";

//INITIAL STATE

const initialState = {
    user: null,
    // accessToken: localStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
    student: null,
    success: null,
    team: null,
}


//THIS PART WILL MANAGE THE USER STATE
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            // localStorage.setItem('accessToken', action.payload.accessToken);
            return { ...state, user: action.payload.user, loading: false, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'REFRESH_TOKEN':
            // localStorage.setItem('accessToken', action.payload.accessToken);
            return {...state};
        case 'LOGOUT':
            // localStorage.removeItem('token');
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
        case 'SELECT_STUDENT':
            return {...state, student: action.payload};
        case 'SELECT_TEAM':
            return {...state, team: action.payload};
        case 'REQUEST':
            return { ...state, loading: true, error: null };
        case 'SUCCESS':
            return { ...state, loading: false, error: null, success: action.payload || null };
        case 'SUCCESS_DISMISS':
            return { ...state, loading: false, error: null, success: null };
        case 'ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'DISMISS_STUDENT':
            return { ...state, student: null }


        default:
            return state;
    }

};

//GLOBAL
export const GlobalContext = createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
   


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>

    );
};