import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

/*Change these imports to all teams and teamates in a students team */
import InstructorDashboardTeams from "../components/StudentDashboardAllTeams.jsx";
import InstructorDashboardStudents from "../components/StudentDashboardMyTeam.jsx";

import {GlobalContext} from "../GlobalStateProvider.jsx";
import styles from "../styles/StudentDashboard.module.css";
import Header from '../components/Header.jsx';
import axios from "axios";

function StudentDashboard() {

    const { state } = useContext(GlobalContext);
    const [search, setSearch] = useState('');
    const [view, setView] = useState('All Teams');
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);



    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');  // Ensure this endpoint matches your backend route
                // console.log(response);
                const fetchedStudents = response.data;  // Access the data inside the response


                setStudents(fetchedStudents);

                const processedTeams = fetchedStudents.reduce((acc, student) => {

                    if (student.teams) {
                        if (!acc[student.teams]) {
                            acc[student.teams] = { teamName: student.teams, members: [] };
                        }
                        acc[student.teams].members.push(student);
                    }
                    return acc;
                }, {});

                setTeams(Object.values(processedTeams));
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();  // Call the function to fetch students on component mount
    }, []);


    return (

        <>
             <div>
                <Header></Header>

            </div>
            <h1 className={styles.pageTitle}>
                {state.user ? (
                    state.user.teams ? 'Welcome to ' + state.user.teams + ', ' + state.user.firstName + ' ' + state.user.lastName : 'Welcome ' + state.user.firstName + ' ' + state.user.lastName + ', you are currently not in a team'
                    )
                    : 'You are currently not logged in.'}
            </h1>
            <h1 className={styles.pageTitle}>Student Dashboard: </h1>


            <div className={styles.displayBox}>
                <div className={styles.displayTeamsBox}>
                    <button className={styles.buttonFilter} onClick={() => {

                        setView(view === 'All Teams' ? 'My Team' : 'All Teams');
                        setSearch('')
                    }}>{view}</button>
                    <input className={styles.searchBar} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search'} />


                    <div className={styles.results}>
                        {view === 'My Team' ? <InstructorDashboardTeams teams={teams} search={search} /> : <InstructorDashboardStudents students={students} search={search} />}
                    </div>
                </div>
            </div>
            
        </>


    )
}

export default StudentDashboard;