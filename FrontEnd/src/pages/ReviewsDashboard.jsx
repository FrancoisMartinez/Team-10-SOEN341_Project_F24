import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import Header from "../components/Header.jsx";
import styles from "../styles/ReviewsDashboard.module.css";
import axios from "axios";
import ReviewDashboardSummary from "../components/ReviewDashboardSummary.jsx";
import ReviewDashboardDetailed from "../components/ReviewDashboardDetailed.jsx";

function ReviewsDashboard() {
    const [search, setSearch] = useState('');
    const [view, setView] = useState('Summary');
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [originalTeams, setOriginalTeams] = useState([]); // Holds the static team data

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');
                const fetchedStudents = response.data;

                const studentsWithReviews = await Promise.all(fetchedStudents.map(async (student) => {
                    const reviewsResponse = await axios.get(`http://localhost:3000/reviews/${student.email}`);
                    return { ...student, reviews: reviewsResponse.data };
                }));
                setStudents(studentsWithReviews);

                // Process teams
                const processedTeams = studentsWithReviews.reduce((acc, student) => {
                    const teamName = student.teams;
                    if (!acc[teamName]) {
                        acc[teamName] = { teamName: teamName, members: [] };
                    }
                    acc[teamName].members.push(student);
                    return acc;
                }, {});

                const teamsArray = Object.values(processedTeams);
                setTeams(teamsArray);
                setOriginalTeams(teamsArray); // Store the unmodified teams data

            } catch (error) {
                console.error("Error fetching students or reviews: ", error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <>
            <div>
                <Header />
            </div>
            <h1 className={styles.pageTitle}>Reviews:</h1>
            <div className={styles.displayBox}>
                <div className={styles.displayType}>
                    <button onClick={() => {
                        setView(view === 'Summary' ? 'Detailed' : 'Summary');
                        setSearch('');
                    }}>
                        {view === 'Summary' ? 'Summary' : 'Detailed'}
                    </button>
                    <input
                        className={styles.searchBar}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={'Search'}
                    />
                    <div className={styles.results}>
                        {view === 'Detailed' ? (
                            <ReviewDashboardSummary students={students} search={search} />
                        ) : (
                            <ReviewDashboardDetailed teams={teams} originalTeams={originalTeams} search={search} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewsDashboard;
