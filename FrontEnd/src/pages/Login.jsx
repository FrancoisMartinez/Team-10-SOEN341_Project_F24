import React from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';

function Login() {

    const [email, setEmail] = useState('');


    return (
        <>
            <div className={styles.background}>
                <div className={styles.loginWindow}>
                    <div className={styles.loginWindowLeft}>


                        <img className={styles.logo} src="/Logo.webp" alt="Logo" width="150" height="150" />
                        <h1 className={styles.siteName}>Rate My Teammates</h1>


                    </div>
                    <div className={styles.loginWindowRight}>
                        <h1 className={styles.studentLogIn}>Student Login</h1>
                        <div className={styles.emailBox}>
                            <img className={styles.emailLogo} src="/email_logo.png" alt="email logo" width="30" height="30" />
                            <h2 className={styles.emailTag}>Email</h2>
                        </div>
                        <div className= {styles.passBox}>
                            <img className={styles.passLogo} src="/password_logo.png" alt="password logo" width="30" height="30" />
                            <h2 className={styles.passTag}>Password</h2>

                        </div>
                        <div className={styles.loginButton}>
                            <h2 className={styles.loginTag}>Login</h2>
                        </div>

                        <h4 className={styles.instructorLogin}>Intructor login</h4>
                    
                        <h4 className={styles.createAccount}>Create your account</h4>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login;