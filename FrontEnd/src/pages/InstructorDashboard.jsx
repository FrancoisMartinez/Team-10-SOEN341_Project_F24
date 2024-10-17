import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../GlobalStateProvider.jsx";
import InstructorDashboardTeams from "../components/InstructorDashboardTeams.jsx";
import Header from "../components/Header.jsx";
import InstructorDashboardStudents from "../components/InstructorDashboardStudents.jsx";

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
    const  [teamSearch, setTeamSearch]  = useState('');
    const  [view, setView] = useState('Team');

    return (
        <>
            {state.user && <p>Welcome {state.user.email}</p>}


            {/*<input type="text" value={teamSearch} onChange={(e) => setTeamSearch(e.target.value)} placeholder={'Search a Team or a Student'}/>*/}

            <button onClick={() => setView(view === 'Team' ? 'Student' : 'Team')}>{view}</button>

            <button onClick={() => navigate('/')}>new team</button>

            <div>
                {view === 'Team' ? <InstructorDashboardTeams teams={teams}/> : <InstructorDashboardStudents students={students}/>}
            </div>
        </>

    )
}

export default InstructorDashboard;