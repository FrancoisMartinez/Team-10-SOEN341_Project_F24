import React from 'react';
import styles from "/src/styles/Teams.module.css";

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
                <div  key={index} className={styles.teamContainer}>

                    <div className={styles.team}>
                        <h1>{team.teamName}</h1>
                        {team.students.map(student => (
                            <div key={student.id}>
                                <p>{student}</p>
                            </div>
                        ))}

                    </div>


                </div>
            ))}

        </>
    )
}
export default Teams;