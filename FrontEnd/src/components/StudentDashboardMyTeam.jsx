import React, { useEffect, useState } from "react";
import styles from "../styles/StudentDashboard.module.css";


function InstructorDashboardStudents({ students, search }) {

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
                        <h3>{student.name}</h3>
                        
                    </li>)}
            </ul>
        </div>
    )
}

export default InstructorDashboardStudents;