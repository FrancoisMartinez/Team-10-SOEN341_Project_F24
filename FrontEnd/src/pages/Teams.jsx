import React from 'react';

const teams = [
    {
        teamName: "Team Alpha",
        students: ["Alice", "Bob", "Charlie"]
    },
    {
        teamName: "Team Beta",
        students: ["David", "Eva", "Frank"]
    },
    {
        teamName: "Team Gamma",
        students: ["George", "Hannah", "Irene"]
    }
];

function Teams() {



    return (
        <>
            {teams.map((team, index) => (
                <div key={index} className="team">
                    <h1>{team.teamName}</h1>
                    {team.students.map(student => (
                        <div key={student.id}>
                            <p>{student}</p>
                        </div>
                    ))}
                </div>
            ))}

        </>
    )
}
export default Teams;