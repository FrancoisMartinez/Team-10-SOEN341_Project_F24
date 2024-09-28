import React, {createContext, useReducer} from "react";

// Initial state
const initialState = {
    user: null
}

// Manage the user state
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
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