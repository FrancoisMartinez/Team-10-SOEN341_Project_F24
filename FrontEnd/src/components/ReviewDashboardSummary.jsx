import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

function calculateAverageRating(reviews) {
    if (reviews.length === 0) return {
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
                totalRatings.WorkEthicRating) / (4 * reviews.length)
        ).toFixed(2)
    };

    return averages;
}

function ReviewDashboardSummary({ students = [], search = "" }) {
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (column) => {
        const order = (sortBy === column && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortBy(column);
        setSortOrder(order);

        const sortedStudents = [...filteredStudents].sort((a, b) => {
            let valueA, valueB;

            if (column === 'firstName' || column === 'lastName') {
                valueA = a[column]?.toLowerCase() || ""; // Case-insensitive sorting for names
                valueB = b[column]?.toLowerCase() || "";
            } else if (column === 'average') {
                valueA = calculateAverageRating(a.reviews).OverallAverage;
                valueB = calculateAverageRating(b.reviews).OverallAverage;
            } else if (column === 'teams') {
                valueA = a.teams || "No Team";
                valueB = b.teams || "No Team";
            } else {
                // For individual ratings like CooperationRating, ConceptualContributionRating, etc.
                valueA = calculateAverageRating(a.reviews)[column];
                valueB = calculateAverageRating(b.reviews)[column];
            }

            // Convert "N/A" to infinity for sorting, ensuring "N/A" appears last
            valueA = valueA === "N/A" ? (order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY) : parseFloat(valueA);
            valueB = valueB === "N/A" ? (order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY) : parseFloat(valueB);

            if (order === 'asc') return valueA > valueB ? 1 : -1;
            return valueA < valueB ? 1 : -1;
        });

        setFilteredStudents(sortedStudents);
    };



    useEffect(() => {
        setFilteredStudents(
            students.filter((student) =>
                student.firstName?.toLowerCase().includes(search.toLowerCase()) ||
                student.lastName?.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, students]);

    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <FaSortUp color="purple" /> : <FaSortDown color="purple" />;
        }
        return <FaSort color="gray" />;
    };

    return (
        <div className={styles.studentBlock}>
            <table className={styles.studentTable}>
                <thead>
                <tr>
                    <th onClick={() => handleSort('email')}>Email {renderSortIcon('email')}</th>
                    <th onClick={() => handleSort('firstName')}>First Name {renderSortIcon('firstName')}</th>
                    <th onClick={() => handleSort('lastName')}>Last Name {renderSortIcon('lastName')}</th>
                    <th onClick={() => handleSort('teams')}>Team {renderSortIcon('teams')}</th>
                    <th onClick={() => handleSort('CooperationRating')}>Cooperation {renderSortIcon('CooperationRating')}</th>
                    <th onClick={() => handleSort('ConceptualContributionRating')}>Conceptual {renderSortIcon('ConceptualContributionRating')}</th>
                    <th onClick={() => handleSort('PracticalContributionRating')}>Practical {renderSortIcon('PracticalContributionRating')}</th>
                    <th onClick={() => handleSort('WorkEthicRating')}>Work Ethic {renderSortIcon('WorkEthicRating')}</th>
                    <th onClick={() => handleSort('average')}>Average {renderSortIcon('average')}</th>
                    <th onClick={() => handleSort('reviews')}>Responded {renderSortIcon('reviews')}</th>
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
                            <td>{student.teams || "No Team"}</td> {/* Handle null team names */}
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
