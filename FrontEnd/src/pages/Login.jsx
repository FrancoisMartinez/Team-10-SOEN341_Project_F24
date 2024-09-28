import React from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');


    return (
        <>
            <h1 className={styles.loginTitle}>Login</h1>

            <p>{email}</p>
        </>
    )
}

export default Login;