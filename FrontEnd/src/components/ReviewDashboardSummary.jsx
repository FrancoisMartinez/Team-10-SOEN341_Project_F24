
import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";


function ReviewDashboardSummary({ students, search }) {

    const [filteredStudents, setFilteredStudents] = useState(students)

    useEffect(() => {
        setFilteredStudents(
            students?.filter((student) => student.firstName.toLowerCase().includes(search.toLowerCase()) || student.lastName.toLowerCase().includes(search.toLowerCase())))
    }, [search, students]);

    return (
        <div className={styles.studentBlock}>
            <table className={styles.studentTable}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Team</th>
                        <th>Cooperation</th>
                        <th>Conceptual</th>
                        <th>Practical</th>
                        <th>Work Ethic</th>
                        <th>Average</th>
                        <th>Responded</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents?.map((student, index) => (
                        <tr key={index}>
                            <td>{student.email}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.team}</td>
                            <td>{student.cooperation}</td>
                            <td>{student.conceptual}</td>
                            <td>{student.practical}</td>
                            <td>{student.workEthic}</td>
                            <td>{student.average}</td>
                            <td>{student.responded}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
    
}

export default ReviewDashboardSummary;