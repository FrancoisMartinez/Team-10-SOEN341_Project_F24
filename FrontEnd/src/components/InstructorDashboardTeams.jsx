import React, {useContext, useEffect, useState} from "react";
import styles from "../styles/InstructorDashboard.module.css";
import { IoIosAddCircle } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../GlobalStateProvider.jsx";

//***************************************** */
// INSTRUCTOR DASHBOARD
//***************************************** */



function InstructorDashboardTeams({ teams, search }) {
    const { dispatch } = useContext(GlobalContext);
    const [filteredTeams, setFilteredTeams] = useState(teams)

    const navigate = useNavigate();


    useEffect(() => {
        setFilteredTeams(
            teams
                .filter((team) => team.teamName.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.teamName.localeCompare(b.teamName))
        );
    }, [search, teams]);


    const handleTeamClick = (team) => {
        dispatch({ type: 'SELECT_TEAM', payload: team });
        setTimeout(() => {
            navigate('/updateTeam');
        }, 100);
    };



//***************************************** */
// HTML SECTION
//***************************************** */


    return (
        <div >
            {filteredTeams.map((team, index) =>

                /* loops through all teams */
                <div className={styles.teamBlock} key={index}>

                    {/* group h2 and ul into a button */}

                    <h2 >{team.teamName} <IoIosAddCircle onClick={() => handleTeamClick(team)} className={styles.addStudent}/></h2>
                    
                    <ul >
                        {team.members.map((member, jndex) =>
                            <li key={jndex}>{member.firstName} {member.lastName}</li>
                        )}
                    </ul>
                </div>

            )}
        </div>
    )
}

export default InstructorDashboardTeams;