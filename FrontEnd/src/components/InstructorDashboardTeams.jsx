import React, { useEffect, useState } from "react";
import styles from "../styles/InstructorDashboard.module.css";


function InstructorDashboardTeams({ teams, search }) {

    const [filteredTeams, setFilteredTeams] = useState(teams)

    useEffect(() => {
        setFilteredTeams(
            teams.filter((student) => student.teamName.toLowerCase().includes(search.toLowerCase())))
    }, [search, teams]);

    return (
        <div >
            {filteredTeams.map((team, index) =>

                /* loops through all teams */
                <div className={styles.teamBlock} key={index}>

                    {/* group h2 and ul into a button */}

                    <h2>{team.teamName}</h2>
                    <ul >
                        {team.members.map((member, jndex) =>
                            <li key={jndex}>{member.name}</li>
                        )}
                    </ul>
                </div>

            )}
        </div>
    )
}

export default InstructorDashboardTeams;