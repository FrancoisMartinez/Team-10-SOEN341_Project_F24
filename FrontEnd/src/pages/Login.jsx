import React, {useContext} from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';
import { GlobalContext } from "../GlobalStateProvider.jsx";


function Login() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [student, setStudent] = useState(true);



    return (
        <>
            <div className={styles.background}>
                <div className={styles.loginWindow}>


                    <div className={styles.loginWindowLeft}>
                        <img className={styles.logo} src="/Logo.webp" alt="Logo" width="150" height="150" />
                        <h1 className={styles.siteName}>Rate My Teammates</h1>
                    </div>


                    <form className={styles.loginWindowRight}>

                        <h1 className={styles.studentLogIn}>{student ? 'Student' : 'Instructor'} Login</h1>

                        <input type='email' className={styles.inputBox} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                            {/*<img className={styles.emailLogo} src="/email_logo.png" alt="email logo" width="30"*/}
                            {/*     height="30"/>*/}
                            {/*<h2 className={styles.emailTag}>Email</h2>*/}


                        <input type='password' className={styles.inputBox} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                            {/*<img className={styles.passLogo} src="/password_logo.png" alt="password logo" width="30"*/}
                            {/*     height="30"/>*/}
                            {/*<h2 className={styles.passTag}>Password</h2>*/}





                        <button className={styles.loginButton}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch({type: 'LOGIN', payload: {name: 'test user'}});
                            }
                            }>
                            <h2 className={styles.loginTag}>Login</h2>
                        </button>



                        <h4 className={styles.instructorLogin} onClick={() => setStudent(prevState => !prevState)}>{student ? 'Instructor' : 'Student'} login</h4>

                        <h4 className={styles.createAccount} onClick={() => navigate('/register')}>Create your account</h4>
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

export default Login;