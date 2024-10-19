import React, {useContext} from 'react';
import styles from '/src/styles/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Navigation from "../components/Navigation.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";


function Login() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instructor, setInstructor] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_REQUEST'})

        try {
            // Send POST request to backend /signup route
            const response = await axios.post("http://localhost:3000/login", { email, password, instructor });

            if (response.status === 200) {

                const { user, token } = response.data;

                dispatch({type: 'LOGIN_SUCCESS', payload: { user, token }});
                setEmail('')
                setPassword('')
                navigate('/')

            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: (instructor ?  'Instructor' : 'Student') + error.response?.data?.error || 'An error occurred. Please try again.'
            });
        }
    };

    return (
        <>

            {state.loading && <Loading/>}
            {state.error && <Error/>}

            <Navigation/>
            <div className={styles.background}>
                <div className={styles.loginWindow}>


                    <div className={styles.loginWindowLeft}>
                        <img className={styles.logo} src="/Logo.webp" alt="Logo" width="150" height="150" />
                        <h1 className={styles.siteName}>Rate My Teammates</h1>
                    </div>


                    <form className={styles.loginWindowRight} onSubmit={handleSubmit}>

                        <h1 className={styles.studentLogIn}>{instructor ? 'Instructor' : 'Student'} Login</h1>

                        <input type='email' className={styles.inputBox} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>

                        <input type='password' className={styles.inputBox} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

                        <button className={styles.loginButton} type="submit">Login
                        </button>



                        <h4 className={styles.instructorLogin} onClick={() => setInstructor(prevState => !prevState)}>{instructor ? 'Student' : 'Instructor'} login</h4>
                        <h4 className={styles.createAccount} onClick={() => navigate('/register')}>Create your account</h4>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Login;