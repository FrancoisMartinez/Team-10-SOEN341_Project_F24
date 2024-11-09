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
                            <td>{student.reviews?.length || 0}</td> {/* Display the number of reviews */}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ReviewDashboardSummary;
