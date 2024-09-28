import React, {useContext, useReducer} from 'react';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import {useNavigate} from "react-router-dom";


function Login() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

    console.log(state);


    return (
        <>

            <button onClick={() => {navigate('/')}}>home</button>


            <button
                onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'LOGIN', payload: {name: 'test user'}});
                }
                }>
                Login
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'LOGOUT', payload: {name: 'test user'}});
                }
                }>
                Logout
            </button>

            {state.user ? <p>Logged in as: {state.user.name}</p> : <p>Please log in</p>}


        </>
    )
}

export default Login;