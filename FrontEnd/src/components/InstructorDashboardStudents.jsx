import React from "react";

function InstructorDashboardStudents({ students }) {

    return (
        <ul>
            {students.map((student, index) =>
            <li key={index}>
                <h3>{student.name}</h3>
                <p>{student.team}</p>
            </li> )}
        </ul>
    )
}

export default InstructorDashboardStudents;