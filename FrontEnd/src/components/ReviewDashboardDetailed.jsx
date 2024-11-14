
import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";

function calculateAverageRating(reviews) {
    if (reviews.length === 0) return {
        CooperationRating: "N/A",
        ConceptualContributionRating: "N/A",
        PracticalContributionRating: "N/A",
        WorkEthicRating: "N/A",
        OverallAverage: "N/A"
    };

    // Calculate the average for each rating category
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

function ReviewDashboardDetailed({ teams, search }) {

    const [filteredTeams, setFilteredTeams] = useState(teams)



    useEffect(() => {
        setFilteredTeams(
            teams.filter((team) => team.teamName?.toLowerCase().includes(search.toLowerCase())))
    }, [search, teams]);



    console.log(filteredTeams)

    return (
        <div>
            {filteredTeams.map((team, index) => (
                <div className={styles.teamBlock} key={index}>
                    <h2>{team.teamName}</h2>

                    <div className={styles.studentNames}>
                        {team.members.map((member) => (
                            <span key={member._id}>{member.firstName} {member.lastName}</span>
                        )).reduce((prev, curr) => [prev, ", ", curr])} {/* Comma-separated names */}
                    </div>
                    <br/>
                    <table className={styles.studentTable}>
                        <thead>
                        <tr>
                            <th>Student</th>
                            <th>Cooperation</th>
                            <th>Conceptual</th>
                            <th>Practical</th>
                            <th>Work Ethic</th>
                            <th>Average</th>
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
                    <div className={styles.commentsSection}>
                        <h3>Comments:</h3>
                        {team.members
                            .filter(member => member.reviews && member.reviews.some(review =>
                                review.CooperationComment ||
                                review.ConceptualContributionComment ||
                                review.PracticalContributionComment ||
                                review.WorkEthicComment
                            ))
                            .map((member, memberIndex) => (
                                <div key={`${memberIndex}-comment`}>
                                    <strong>{member.firstName} {member.lastName} comments:</strong>
                                    <ul style={{marginLeft: '20px', listStyleType: 'disc'}}>
                                        {member.reviews.map((review, reviewIndex) => (
                                            <React.Fragment key={reviewIndex}>
                                                {review.CooperationComment && (
                                                    <li>Cooperation: {review.CooperationComment}</li>
                                                )}
                                                {review.ConceptualContributionComment && (
                                                    <li>Conceptual
                                                        Contribution: {review.ConceptualContributionComment}</li>
                                                )}
                                                {review.PracticalContributionComment && (
                                                    <li>Practical
                                                        Contribution: {review.PracticalContributionComment}</li>
                                                )}
                                                {review.WorkEthicComment && (
                                                    <li>Work Ethic: {review.WorkEthicComment}</li>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>


                    <br/>
                </div>
            ))}
        </div>

    );


}

export default ReviewDashboardDetailed;