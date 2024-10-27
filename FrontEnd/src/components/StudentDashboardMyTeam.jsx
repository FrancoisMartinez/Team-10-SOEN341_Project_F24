import React, {useContext, useEffect, useState} from "react";
import styles from "../styles/StudentDashboard.module.css";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../GlobalStateProvider.jsx";


function InstructorDashboardStudents({ students, search }) {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [filteredStudents, setFilteredStudents] = useState(students)


    useEffect(() => {
        setFilteredStudents(
            students
                .filter((student) => student.teams && state.user?.teams === student.teams)
                .filter((student) => student.lastName.toLowerCase().includes(search.toLowerCase()) || student.firstName.toLowerCase().includes(search.toLowerCase())))
    }, [search, students]);

    console.log(state.student)
    return (
        <div className={styles.studentBlock}>

            {state.user?.teams ?

                <ul>
                    <h3>Choose a student to review.</h3>

                    {/* Add an onClick event that triggers a review form for a student. */}
                    {filteredStudents.map((student, index) =>
                        <li key={index}>
                            <h3 onClick={(e) => {
                                navigate('/reviewForm');
                                dispatch({type: 'SELECT_STUDENT', payload: student})

                            }}>{student.firstName} {student.lastName}</h3>
                        </li>)}
                </ul>
                :
                <h3>You are not currently in a team</h3>

            }

        </div>
    )
}

export default InstructorDashboardStudents;