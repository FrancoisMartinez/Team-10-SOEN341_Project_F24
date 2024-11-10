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
                totalRatings.WorkEthicRating) /
            (4 * reviews.length)
        ).toFixed(2)
    };

    return averages;
}

function ReviewDashboardDetailed({ teams, originalTeams, search }) {
    const [filteredTeams, setFilteredTeams] = useState(teams);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Handle sorting
    const handleSort = (column) => {
        const order = (sortBy === column && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortBy(column);
        setSortOrder(order);

        const sortedTeams = [...filteredTeams].map((team) => {
            const sortedMembers = [...team.members].sort((a, b) => {
                let valueA, valueB;

                if (column === 'firstName') {
                    valueA = a.firstName.toLowerCase();
                    valueB = b.firstName.toLowerCase();
                } else {
                    valueA = column === 'average'
                        ? calculateAverageRating(a.reviews).OverallAverage
                        : calculateAverageRating(a.reviews)[column];
                    valueB = column === 'average'
                        ? calculateAverageRating(b.reviews).OverallAverage
                        : calculateAverageRating(b.reviews)[column];

                    valueA = valueA === "N/A" ? (order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY) : parseFloat(valueA);
                    valueB = valueB === "N/A" ? (order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY) : parseFloat(valueB);
                }

                return order === 'asc' ? valueA > valueB ? 1 : -1 : valueA < valueB ? 1 : -1;
            });

            return { ...team, members: sortedMembers };
        });
        setFilteredTeams(sortedTeams);
    };

    // Filter teams based on search input
    useEffect(() => {
        setFilteredTeams(
            teams.filter((team) =>
                team.teamName?.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, teams]);

    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <FaSortUp color="purple" /> : <FaSortDown color="purple" />;
        }
        return <FaSort color="gray" />;
    };

    return (
        <div>
            {filteredTeams.map((team, index) => {
                const originalTeam = originalTeams.find((t) => t.teamName === team.teamName);
                return (
                    <div className={styles.teamBlock} key={index}>
                        <h2>{team.teamName}</h2>
                        <div className={styles.studentNames}>
                            {originalTeam.members.map((member) => (
                                <span key={member._id}>{member.firstName} {member.lastName}</span>
                            )).reduce((prev, curr) => [prev, ", ", curr])}
                        </div>
                        <br/>
                        <table className={styles.studentTable}>
                            <thead>
                            <tr>
                                <th onClick={() => handleSort('firstName')}>
                                    Student {renderSortIcon('firstName')}
                                </th>
                                <th onClick={() => handleSort('CooperationRating')}>
                                    Cooperation {renderSortIcon('CooperationRating')}
                                </th>
                                <th onClick={() => handleSort('ConceptualContributionRating')}>
                                    Conceptual {renderSortIcon('ConceptualContributionRating')}
                                </th>
                                <th onClick={() => handleSort('PracticalContributionRating')}>
                                    Practical {renderSortIcon('PracticalContributionRating')}
                                </th>
                                <th onClick={() => handleSort('WorkEthicRating')}>
                                    Work Ethic {renderSortIcon('WorkEthicRating')}
                                </th>
                                <th onClick={() => handleSort('average')}>
                                    Average {renderSortIcon('average')}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {team.members.map((member, jndex) => {
                                const averages = calculateAverageRating(member.reviews);
                                return (
                                    <tr key={`${index}-${jndex}`}>
                                        <td>{member.firstName} {member.lastName}</td>
                                        <td>{averages.CooperationRating}</td>
                                        <td>{averages.ConceptualContributionRating}</td>
                                        <td>{averages.PracticalContributionRating}</td>
                                        <td>{averages.WorkEthicRating}</td>
                                        <td>{averages.OverallAverage}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <br/>
                    </div>
                );
            })}
        </div>
    );
}

export default ReviewDashboardDetailed;
