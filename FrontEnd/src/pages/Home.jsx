import React, {useContext} from 'react';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import {useNavigate} from "react-router-dom";

function Home() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

    console.log(state);



    return (
        <div>


            <p>home</p>
            {state.user ? <p>Logged in as: {state.user.email}</p> : <p>Please log in</p>}
            {state.user ? <button onClick={(e) => {e.preventDefault();
                dispatch({type: 'LOGOUT'});
                }}>Logout</button> : <button onClick={() => {navigate('/login')}}>login</button>}



        </div>
    )
}

export default Home;