import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Header from "../components/Header.jsx";
import styles from "../styles/ReviewsDashboard.module.css";
import axios from "axios";
import ReviewDashboardSummary from "../components/ReviewDashboardSummary.jsx";
import ReviewDashboardDetailed from "../components/ReviewDashboardDetailed.jsx";
import TeammateSelection from './TeammateSelection.jsx';



const studentsList = [
    {
        email: "student112211321321231@gmail.com",
        lastName: "Doe",
        firstName: "Jane",
        team: "Team A",
        cooperation: 4,
        conceptual: 4,
        practical: 3,
        workEthic: 5,
        average: 4,
        responded: 4,
    },
    {
        email: "student2@gmail.com",
        lastName: "Smith",
        firstName: "Alex",
        team: "Team B",
        cooperation: 5,
        conceptual: 3,
        practical: 4,
        workEthic: 5,
        average: 4.25,
        responded: 5,
    },
    {
        email: "student3@gmail.com",
        lastName: "Johnson",
        firstName: "Chris",
        team: "Team C",
        cooperation: 2,
        conceptual: 3,
        practical: 5,
        workEthic: 4,
        average: 3.5,
        responded: 4,
    },
    {
        email: "student4@gmail.com",
        lastName: "Brown",
        firstName: "Taylor",
        team: "Team B",
        cooperation: 4,
        conceptual: 4,
        practical: 4,
        workEthic: 3,
        average: 3.75,
        responded: 5,
    },
    {
        email: "student5@gmail.com",
        lastName: "Davis",
        firstName: "Jordan",
        team: "Team C",
        cooperation: 3,
        conceptual: 5,
        practical: 4,
        workEthic: 4,
        average: 4,
        responded: 5,
    },
    {
        email: "student6@gmail.com",
        lastName: "Miller",
        firstName: "Morgan",
        team: "Team A",
        cooperation: 5,
        conceptual: 4,
        practical: 5,
        workEthic: 5,
        average: 4.75,
        responded: 5,
    },
    {
        email: "student7@gmail.com",
        lastName: "Wilson",
        firstName: "Jamie",
        team: "Team B",
        cooperation: 3,
        conceptual: 2,
        practical: 4,
        workEthic: 4,
        average: 3.25,
        responded: 4,
    },
    {
        email: "student8@gmail.com",
        lastName: "Moore",
        firstName: "Casey",
        team: "Team C",
        cooperation: 4,
        conceptual: 3,
        practical: 3,
        workEthic: 5,
        average: 3.75,
        responded: 4,
    },
    {
        email: "student9@gmail.com",
        lastName: "Taylor",
        firstName: "Cameron",
        team: "Team A",
        cooperation: 2,
        conceptual: 4,
        practical: 5,
        workEthic: 3,
        average: 3.5,
        responded: 5,
    },
    {
        email: "student10@gmail.com",
        lastName: "Anderson",
        firstName: "Riley",
        team: "Team B",
        cooperation: 5,
        conceptual: 5,
        practical: 5,
        workEthic: 4,
        average: 4.75,
        responded: 5,
    },
    {
        email: "student11@gmail.com",
        lastName: "Lee",
        firstName: "Taylor",
        team: "Team C",
        cooperation: 3,
        conceptual: 4,
        practical: 4,
        workEthic: 3,
        average: 3.5,
        responded: 4,
    }
];

const processedTeams = Object.values(
    studentsList.reduce((acc, student) => {
        if (!acc[student.team]) {
            acc[student.team] = { teamName: student.team, members: [] };
        }
        acc[student.team].members.push(student);
        return acc;
    }, {})
);


function ReviewsDashboard() {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [search, setSearch]  = useState('');
    const [view, setView] = useState('Summary');
    const [students, setStudents] = useState(studentsList);
    const [teams, setTeams] = useState(processedTeams);

    // useEffect(() => {
    //     const fetchStudents = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/students');  // Ensure this endpoint matches your backend route
    //
    //             const fetchedStudents = response.data;  // Access the data inside the response
    //
    //
    //             setStudents(fetchedStudents);
    //
    //             const processedTeams = fetchedStudents.reduce((acc, student) => {
    //                 if (student.teams) {
    //                     if (!acc[student.teams]) {
    //                         acc[student.teams] = { teamName: student.teams, members: [] };
    //                     }
    //                     acc[student.teams].members.push(student);
    //                 }
    //                 return acc;
    //             }, {});
    //
    //             setTeams(Object.values(processedTeams));
    //
    //         } catch (error) {
    //             console.error("Error fetching students:", error);
    //         }
    //     };
    //
    //     fetchStudents();  // Call the function to fetch students on component mount
    // }, []);

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
                        {view === 'Summary' ? <ReviewDashboardSummary students={students} search={search}/> :  <ReviewDashboardDetailed teams={teams} search={search}/>}
                    </div>
                </div>
            </div>


        </>

    )
}

export default ReviewsDashboard;