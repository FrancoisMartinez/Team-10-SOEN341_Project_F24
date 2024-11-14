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
                .filter(student => student.email !== state.user?.email)
                .filter((student) => student.teams && state.user?.teams === student.teams)
                .filter((student) => student.lastName.toLowerCase().includes(search.toLowerCase()) || student.firstName.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
        );
    }, [search, students]);

    const handleStudentClick = (student) => {
        // Dispatch action to set selected student
        dispatch({ type: 'SELECT_STUDENT', payload: student });

        // Wait for the state to update, then navigate
        setTimeout(() => {
            navigate('/reviewForm');
        }, 100); // Small delay to allow state update (adjust if needed)
    };


    return (
        <div className={styles.studentBlock}>

            {state.user?.teams ?

                <ul>
                    <h3>Choose a student to review in {state.user.teams}.</h3>

                    {/* Add an onClick event that triggers a review form for a student. */}
                    {filteredStudents.map((student, index) =>
                        <li key={index}>
                            <h3 onClick={() => handleStudentClick(student)}>{student.firstName} {student.lastName}</h3>
                        </li>)}
                </ul>
                :
                <h3>You are not currently in a team</h3>

            }

        </div>
    )
}

export default InstructorDashboardStudents;