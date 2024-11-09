
import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";


function ReviewDashboardDetailed({ teams, search }) {

    const [filteredTeams, setFilteredTeams] = useState(teams)



    useEffect(() => {
        setFilteredTeams(
            teams.filter((team) => team.teamName.toLowerCase().includes(search.toLowerCase())))
    }, [search, teams]);





    return (
        <div>
            <div>

                {filteredTeams.map((team, index) =>
                    /* loops through all teams */
                    <div className={styles.teamBlock} key={index}>

                        <h2>{team.teamName}</h2>
                        {team.members.map((member, jndex) => (
                            <div>
                                <h3>{member.firstName} {member.lastName}</h3>
                                <table className={styles.studentTable}>
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Cooperation</th>
                                            <th>Conceptual</th>
                                            <th>Practical</th>
                                            <th>Work Ethic</th>
                                            <th>Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.members.map((member, jndex) => (
                                            <tr key={index}>
                                                <td>{member.firstName} {member.lastName}</td>
                                                <td>{member.cooperation}</td>
                                                <td>{member.conceptual}</td>
                                                <td>{member.practical}</td>
                                                <td>{member.workEthic}</td>
                                                <td>{member.average}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                
                                <br></br> </div>))}



                    </div>

                )}
            </div>


        </div>

    );


}

export default ReviewDashboardDetailed;