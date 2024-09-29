import React, {useContext} from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Navigation from "../components/Navigation.jsx";


function Register() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [student, setStudent] = useState(true);



    console.log(state);

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch({type: 'LOGIN', payload: {email: email, password: password}});
        setEmail('')
        setPassword('')
        navigate('/login')
    }

    return (
        <>
            <Navigation/>
            <div className={styles.background}>
                <div className={styles.loginWindow}>


                    <div className={styles.loginWindowLeft}>
                        <img className={styles.logo} src="/Logo.webp" alt="Logo" width="150" height="150" />
                        <h1 className={styles.siteName}>Rate My Teammates</h1>
                    </div>


                    <form className={styles.loginWindowRight} onSubmit={handleSubmit}>

                        <h1 className={styles.studentLogIn}>{student ? 'Student' : 'Instructor'} Register</h1>

                        <input type='email' className={styles.inputBox} value={email}
                               onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                        {/*<img className={styles.emailLogo} src="/email_logo.png" alt="email logo" width="30"*/}
                        {/*     height="30"/>*/}
                        {/*<h2 className={styles.emailTag}>Email</h2>*/}


                        <input type='password' className={styles.inputBox} value={password}
                               onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

                        <input type='password' className={styles.inputBox} value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Comfirm password'/>

                        <p>{password !== confirmPassword && 'Password does not match'}</p>

                        {/*<img className={styles.passLogo} src="/password_logo.png" alt="password logo" width="30"*/}
                        {/*     height="30"/>*/}
                        {/*<h2 className={styles.passTag}>Password</h2>*/}


                        <button className={styles.loginButton} type="submit">Register
                        </button>


                        <h4 className={styles.instructorLogin}
                            onClick={() => setStudent(prevState => !prevState)}>{student ? 'Instructor' : 'Student'} register</h4>
                        <h4 className={styles.createAccount} onClick={() => navigate('/login')}>Login</h4>

                    </form>
                </div>
            </div>

            {/*<button onClick={() => {navigate('/')}}>home</button>*/}


            {/*<button*/}
            {/*    onClick={(e) => {*/}
            {/*        e.preventDefault();*/}
            {/*        dispatch({type: 'LOGOUT', payload: {name: 'test user'}});*/}
            {/*    }*/}
            {/*    }>*/}
            {/*    Logout*/}
            {/*</button>*/}

            {/*{state.user ? <p>Logged in as: {state.user.name}</p> : <p>Please log in</p>}*/}


        </>
    )
}

export default Register;