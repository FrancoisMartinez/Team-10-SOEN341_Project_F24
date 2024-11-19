import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorDashboardTeams from "../components/InstructorDashboardTeams.jsx";
import Header from "../components/Header.jsx";
import InstructorDashboardStudents from "../components/InstructorDashboardStudents.jsx";
import styles from "../styles/InstructorDashboard.module.css";
import axios from "axios";


function InstructorDashboard() {
    const navigate = useNavigate();
    const [search, setSearch]  = useState('');
    const [view, setView] = useState('Student');
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');  // Ensure this endpoint matches your backend route

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
            <h1 className={styles.pageTitle}>Instructor Dashboard: <br></br></h1>

            <div className={styles.displayBox}>


                <div className={styles.displayTeamsBox}>
                    <button onClick={() => {

                        setView(view === 'Team' ? 'Student' : 'Team');
                        setSearch('')
                    }}>{view === 'Team' ? 'Student' : 'Team'}</button>
                    <input className={styles.searchBar} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search for a ' + view} />

                    <button  onClick={() => navigate('/newTeam')}>new team</button>

                    <div className={styles.results}>
                        {view === 'Team' ? <InstructorDashboardTeams teams={teams} search={search} /> : <InstructorDashboardStudents students={students} search={search} />}
                    </div>
                </div>
            </div>


        </>

    )
}

export default InstructorDashboard;