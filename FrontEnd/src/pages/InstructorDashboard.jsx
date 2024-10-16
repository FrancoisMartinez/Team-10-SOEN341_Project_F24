import React, {useContext, useState} from 'react';
import { GlobalContext } from "../GlobalStateProvider.jsx";


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

function InstructorDashboard() {
    const { state, dispatch } = useContext(GlobalContext);

    const { team, setTeam } = useState('')

    return (
        <>
            {state.user && <p>Welcome {state.user.email}</p>}

            <input type="text" value={team} onChange={(e) => setTeam(e.target.value) }/>

            <p>{name}</p>
        </>

    )
}

export default InstructorDashboard;