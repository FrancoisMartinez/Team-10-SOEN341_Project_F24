import React, {useContext} from 'react';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import {useNavigate} from "react-router-dom";

function Home() {

    const { state } = useContext(GlobalContext);
    const navigate = useNavigate();

    console.log(state);



    return (
        <div>
            <button onClick={() => {
                navigate('/login')
            }}>login
            </button>

            <p>home</p>
            {state.user ? <p>Logged in as: {state.user.name}</p> : <p>Please log in</p>}

        </div>
    )
}

export default Home;