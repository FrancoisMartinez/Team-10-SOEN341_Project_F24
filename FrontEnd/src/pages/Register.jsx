import React, {useContext, useEffect} from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Navigation from "../components/Navigation.jsx";
import axios from 'axios';
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";


function Register() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [instructor, setInstructor] = useState(false);
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordError('')
        } else {
            setPasswordError('Confirm password does not match.')

        }


    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch({type: 'REGISTER_FAILURE',
                payload:  'Confirm password does not match.'
            });
            return;
        }

        dispatch({ type: 'REGISTER_REQUEST' });

        try {
            // Send POST request to backend /signup route
            const response = await axios.post("http://localhost:3000/signup", { firstName, lastName, email, password, instructor });

            if (response.status === 200) {
                dispatch({ type: 'REGISTER_SUCCESS' });


                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login')
            }
        } catch (error) {
            dispatch({
                type: 'REGISTER_FAILURE',
                payload: error.response?.data?.error || 'An error occurred. Please try again.'
            });
        }
    };




    return (
        <>
            {state.loading && <Loading/>}
            {state.error && <Error/>}


            <Navigation/>
            <div className={styles.background}>
                <div className={styles.registerWindow}>


                    <div className={styles.loginWindowLeft}>
                        <img className={styles.logo} src="/Logo.webp" alt="Logo" width="150" height="150" />
                        <h1 className={styles.siteName}>Rate My Teammates</h1>
                    </div>


                    <form className={styles.loginWindowRight} onSubmit={handleSubmit}>

                        <h1 className={styles.studentLogIn}>{instructor ? 'Instructor' : 'Student'} Register</h1>



                        <input type='text' className={styles.inputBox} value={firstName}
                               onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'/>
                        <input type='text' className={styles.inputBox} value={lastName}
                               onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'/>

                        <input type='email' className={styles.inputBox} value={email}
                               onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>


                        <input type='password' className={styles.inputBox} value={password}
                               onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

                        <input type='password' className={styles.inputBox} value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Comfirm password'/>

                        <p>{passwordError}</p>

                        <button className={styles.loginButton} type="submit">Register
                        </button>


                        <h4 className={styles.instructorLogin}
                            onClick={() => setInstructor(prevState => !prevState)}>{instructor ? 'Student' : 'Instructor'} register</h4>
                        <h4 className={styles.createAccount} onClick={() => navigate('/login')}>Login</h4>



                    </form>
                </div>
            </div>



        </>
    )
}

export default Register;