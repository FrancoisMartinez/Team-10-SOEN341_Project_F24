import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return {
        CooperationRating: "N/A",
        ConceptualContributionRating: "N/A",
        PracticalContributionRating: "N/A",
        WorkEthicRating: "N/A",
        OverallAverage: "N/A"
    };

    const totalRatings = reviews.reduce((acc, review) => {
        acc.CooperationRating += review.CooperationRating || 0;
        acc.ConceptualContributionRating += review.ConceptualContributionRating || 0;
        acc.PracticalContributionRating += review.PracticalContributionRating || 0;
        acc.WorkEthicRating += review.WorkEthicRating || 0;
        return acc;
    }, {
        CooperationRating: 0,
        ConceptualContributionRating: 0,
        PracticalContributionRating: 0,
        WorkEthicRating: 0
    });

    const averages = {
        CooperationRating: (totalRatings.CooperationRating / reviews.length).toFixed(2),
        ConceptualContributionRating: (totalRatings.ConceptualContributionRating / reviews.length).toFixed(2),
        PracticalContributionRating: (totalRatings.PracticalContributionRating / reviews.length).toFixed(2),
        WorkEthicRating: (totalRatings.WorkEthicRating / reviews.length).toFixed(2),
        OverallAverage: (
            (totalRatings.CooperationRating +
                totalRatings.ConceptualContributionRating +
                totalRatings.PracticalContributionRating +
                totalRatings.WorkEthicRating) /
            (4 * reviews.length)
        ).toFixed(2)
    };

    return averages;
}

function ReviewDashboardSummary({ students = [], search = "" }) {
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to handle sorting
    const handleSort = (column) => {
        const order = (sortBy === column && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortBy(column);
        setSortOrder(order);

        // Sort the students based on the selected column and order
        const sortedStudents = [...filteredStudents].sort((a, b) => {
            const valueA = column === 'average' ? calculateAverageRating(a.reviews).OverallAverage : a[column];
            const valueB = column === 'average' ? calculateAverageRating(b.reviews).OverallAverage : b[column];

            if (order === 'asc') return valueA > valueB ? 1 : -1;
            return valueA < valueB ? 1 : -1;
        });

        setFilteredStudents(sortedStudents);
    };

    useEffect(() => {
        setFilteredStudents(
            students?.filter((student) =>
                student.firstName?.toLowerCase().includes(search.toLowerCase()) ||
                student.lastName?.toLowerCase().includes(search.toLowerCase())
            ) || []
        );
    }, [search, students]);

    return (
        <div className={styles.studentBlock}>
            <table className={styles.studentTable}>
                <thead>
                <tr>
                    <th onClick={() => handleSort('email')}>Email</th>
                    <th onClick={() => handleSort('firstName')}>First Name</th>
                    <th onClick={() => handleSort('lastName')}>Last Name</th>
                    <th onClick={() => handleSort('teams')}>Team</th>
                    <th onClick={() => handleSort('CooperationRating')}>Cooperation</th>
                    <th onClick={() => handleSort('ConceptualContributionRating')}>Conceptual</th>
                    <th onClick={() => handleSort('PracticalContributionRating')}>Practical</th>
                    <th onClick={() => handleSort('WorkEthicRating')}>Work Ethic</th>
                    <th onClick={() => handleSort('average')}>Average</th>
                    <th onClick={() => handleSort('reviews')}>Responded</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.map((student, index) => {
                    const averages = calculateAverageRating(student.reviews || []);
                    return (
                        <tr key={index}>
                            <td>{student.email}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.teams}</td>
                            <td>{averages.CooperationRating}</td>
                            <td>{averages.ConceptualContributionRating}</td>
                            <td>{averages.PracticalContributionRating}</td>
                            <td>{averages.WorkEthicRating}</td>
                            <td>{averages.OverallAverage}</td>
                            <td>{student.reviews?.length || 0}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ReviewDashboardSummary;
