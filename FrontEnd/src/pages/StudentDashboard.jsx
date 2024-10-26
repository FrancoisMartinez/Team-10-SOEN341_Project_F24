import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';

/*Change these imports to all teams and teamates in a students team */
import InstructorDashboardTeams from "../components/StudentDashboardAllTeams.jsx";
import InstructorDashboardStudents from "../components/StudentDashboardMyTeam.jsx";

import {GlobalContext} from "../GlobalStateProvider.jsx";
import styles from "../styles/StudentDashboard.module.css";
import Header from '../components/header.jsx';

//fake team example
const teams = [
    {
        teamName: "Team A",
        members: [
            { name: "Julia", role: "Developer" },
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
    { name: "Julia", team: "Team A" },
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

function StudentDashboard() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [view, setView] = useState('All Teams');

    return (

        <>
             <div>
                <Header></Header>

            </div>
            <h1 className={styles.pageTitle}>Student Dashboard: <br></br><br></br></h1>

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