import React from "react";

function InstructorDashboardTeams({ teams }) {

    return (
        <div>
            {teams.map((team, index) =>

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