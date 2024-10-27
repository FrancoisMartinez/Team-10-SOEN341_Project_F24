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
            students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase())))
    }, [search, students]);

    return (
        <div className={styles.studentBlock}>

            <ul>
                <h3>Choose a student to review.</h3>

                {/* Add an onClick event that triggers a review form for a student. */}
                {filteredStudents.map((student, index) =>
                    <li key={index}>
                        <h3 onClick={() => {
                            navigate('/reviewForm');
                            dispatch({ type: 'SELECT_STUDENT', payload: student})

                        }}>{student.name}</h3>
                    </li>)}
            </ul>
        </div>
    )
}

export default InstructorDashboardStudents;