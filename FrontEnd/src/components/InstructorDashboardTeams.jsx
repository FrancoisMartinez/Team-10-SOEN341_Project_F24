import React, {useEffect, useState} from "react";

function InstructorDashboardTeams({ teams, search }) {

    const [filteredTeams, setFilteredTeams] = useState(teams)

    useEffect(() => {
        setFilteredTeams(
            teams.filter((student) => student.teamName.toLowerCase().includes(search.toLowerCase())))
    }, [search, teams]);

    return (
        <div>
            {filteredTeams.map((team, index) =>

                <div key={index}>
                    <h2>{team.teamName}</h2>
                    <ul>
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