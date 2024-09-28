import React from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');


    return (
        <>
            <div>
                <img src="Logo.webp" alt="Logo" width="50" height="50">
                <h1>Peer review website</h1>


            </div>
        </>
    )
}

export default Login;