import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Header from "../components/Header.jsx";
import styles from "../styles/ReviewsDashboard.module.css";
import axios from "axios";


function ReviewsDashboard() {
    const { state, dispatch } = useContext(GlobalContext);
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
            <h1 className={styles.pageTitle}>Reviews:  <br></br></h1>

            <div className={styles.displayBox}>


                <div className={styles.displayType}>
                    <button onClick={() => {

                        setView(view === 'Summary' ? 'Detailed' : 'Summary');
                        setSearch('')
                    }}>{view === 'Summary' ? 'Detailed' : 'Summary'}</button>
                    <input className={styles.searchBar} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search'} />

                    <div className={styles.results}>
                    </div>
                </div>
            </div>


        </>

    )
}

export default ReviewsDashboard;