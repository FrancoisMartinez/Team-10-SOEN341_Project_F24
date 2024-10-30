import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import { useNavigate } from "react-router-dom";
import Header from '../components/header.jsx';
import styles from '/src/styles/Home.module.css'



function Home() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

    console.log(state);



    return (

        <div>
            <div>
                <Header></Header>
            </div>

            <div className={styles.mainImage}>
                <img src="/mainpage.jpg" alt="Main Page Image" height="1279px" width="2560px"/>

            </div>

            <div className={styles.welcomeMessage}>
                <h2>Welcome to Rate My Teammates</h2>

                {state.user ? <p>Logged in as: {state.user.email}</p> : <p>Please log in</p>}

                {state.user ?
                    <>
                    <button className={styles.button}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch({type: 'LOGOUT'});
                            }}>Logout
                    </button>

                    {state.user.instructor ?
                        <button className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/instructorDashboard')
                                }}>Instructor Dashboard
                        </button>

                        :
                        <button className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/studentDashboard')
                                }}>Student Dashboard
                        </button>
                    }
                    </>
                            :
                    <>
                        <button className={styles.button}
                            onClick={() => {
                                navigate('/login')
                            }}>Log In
                        </button>

                        <button className={styles.button}
                            onClick={() => {
                                navigate('/register')
                            }}>Sign Up
                        </button>


                    </>
                }

            </div>


        </div>
    )
}


export default Home;