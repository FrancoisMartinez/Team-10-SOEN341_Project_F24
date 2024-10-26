import React, { useEffect, useState } from "react";
import styles from "../styles/InstructorDashboard.module.css";


function InstructorDashboardStudents({ students, search }) {

    const [filteredStudents, setFilteredStudents] = useState(students)

    useEffect(() => {
        setFilteredStudents(
            students?.filter((student) => student.firstName.toLowerCase().includes(search.toLowerCase()) || student.lastName.toLowerCase().includes(search.toLowerCase())))
    }, [search, students]);

    return (
        <div className={styles.studentBlock}>

            <ul>
                {filteredStudents?.map((student, index) =>
                    <li key={index}>
                        <h3>{student.firstName} {student.lastName}</h3>
                        {/*<p>{student.team}</p>*/}
                    </li>)}
            </ul>
        </div>
    )
}

export default InstructorDashboardStudents;