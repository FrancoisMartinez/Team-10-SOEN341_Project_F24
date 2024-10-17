import React, {useEffect, useState} from "react";

function InstructorDashboardStudents({ students, search }) {

    const [filteredStudents, setFilteredStudents] = useState(students)

    useEffect(() => {
        setFilteredStudents(
            students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase())))
    }, [search, students]);

    return (
        <ul>
            {filteredStudents.map((student, index) =>
            <li key={index}>
                <h3>{student.name}</h3>
                <p>{student.team}</p>
            </li> )}
        </ul>
    )
}

export default InstructorDashboardStudents;