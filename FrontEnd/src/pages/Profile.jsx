import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import InstructorDashboardTeams from "../components/InstructorDashboardTeams.jsx";
import Header from "../components/Header.jsx";
import InstructorDashboardStudents from "../components/InstructorDashboardStudents.jsx";
import styles from "../styles/InstructorDashboard.module.css";
import axios from "axios";


function Profile() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();



    return (

        <>
           
            <Header></Header>

            {/* Page title will be student's name */}

            <div className={styles.reviewDiv}>
                
            <h2>Leave a review for: {state.student?.firstName} {state.student?.lastName}</h2><br></br>


            <Comments/>
                <button className={styles.submitButton} onClick={() => navigate('/studentDashboard')}>back</button>

            </div>
        </>


    )
}

export default Profile;