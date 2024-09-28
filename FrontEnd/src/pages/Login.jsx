import React from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';

function Login() {

    const [email, setEmail] = useState('');


    return (
        <>
            <div>
                <Header/>
                

            </div>
        </>
    )
}

export default Login;