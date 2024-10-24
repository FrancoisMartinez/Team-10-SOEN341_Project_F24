import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import InstructorDashboardTeams from "../components/InstructorDashboardTeams.jsx";
import Header from "../components/Header.jsx";
import InstructorDashboardStudents from "../components/InstructorDashboardStudents.jsx";
import styles from "../styles/InstructorDashboard.module.css";
import axios from "axios";

//fake team example
const teams = [
    {
        teamName: "Team A",
        members: [
            { name: "Alice", role: "Developer" },
            { name: "Bob", role: "Tester" },
            { name: "Charlie", role: "Manager" },
            { name: "Diana", role: "Designer" },
            { name: "Eve", role: "DevOps" }
        ]
    },
    {
        teamName: "Team B",
        members: [
            { name: "Frank", role: "Developer" },
            { name: "Grace", role: "Tester" },
            { name: "Hank", role: "Manager" },
            { name: "Ivy", role: "Designer" },
            { name: "Jack", role: "DevOps" }
        ]
    },
    {
        teamName: "Team C",
        members: [
            { name: "Kevin", role: "Developer" },
            { name: "Lana", role: "Tester" },
            { name: "Mason", role: "Manager" },
            { name: "Nina", role: "Designer" },
            { name: "Oscar", role: "DevOps" }
        ]
    }
];

const students = [
    { name: "Alice", team: "Team A" },
    { name: "Bob", team: "Team B" },
    { name: "Charlie", team: "Team A" },
    { name: "Diana", team: "Team C" },
    { name: "Eve", team: "Team B" },
    { name: "Frank", team: "Team A" },
    { name: "Grace", team: "Team C" },
    { name: "Hank", team: "Team B" },
    { name: "Ivy", team: "Team C" },
    { name: "Jack", team: "Team A" }
];

function InstructorDashboard() {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const  [search, setSearch]  = useState('');
    const  [view, setView] = useState('Team');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/students');  // Ensure this endpoint matches your backend route
                setStudents(response.data);  // Access the data inside the response
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();  // Call the function to fetch students on component mount
    }, []);


    console.log(students)


    return (
        <>
            {state.user && <p>Welcome {state.user.email}</p>}

            <div>
                <Header></Header>

            </div>
            <div className={styles.displayBox}>


                <div className={styles.displayTeamsBox}>
                    <button onClick={() => {

                        setView(view === 'Team' ? 'Student' : 'Team');
                        setSearch('')
                    }}>{view}</button>
                    <input className={styles.searchBar} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search for a ' + view} />

                    <button  onClick={() => navigate('/')}>new team</button>

                    <div className={styles.results}>
                        {view === 'Team' ? <InstructorDashboardTeams teams={teams} search={search} /> : <InstructorDashboardStudents students={students} search={search} />}
                    </div>
                </div>
            </div>


        </>

    )
}

export default InstructorDashboard;