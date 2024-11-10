import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";

function ReviewDashboardSummary({ students, search }) {
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null); // Store the full student object
    const [message, setMessage] = useState("Enter your message."); // State to manage message input
    const [submissionStatus, setSubmissionStatus] = useState(""); // State to manage submission status
}
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

    // Function to open the popup and populate selected student
    const openPopup = (student) => {
        setSelectedStudent(student); // Set the selected student
        setPopupVisible(true); // Show the popup
    };

    // Function to close the popup
    const closePopup = () => {
        setPopupVisible(false); // Hide the popup
    };

    // Handle message change
    const handleMessageChange = (e) => {
        setMessage(e.target.value); // Update the message state
    };

    // Handle focus event to clear default message
    const handleFocus = () => {
        if (message === "Enter your message.") {
            setMessage(""); // Clear default text on focus
        }
    };

    // Handle blur event to restore default message if text area is empty
    const handleBlur = () => {
        if (message.trim() === "") {
            setMessage("Enter your message."); // Restore default text if empty
        }
    };

    // Handle message submission
    const handleSubmit = () => {
        if (message.trim() === "" || message === "Enter your message.") {
            setSubmissionStatus("Please enter a valid message before submitting.");
        } else {
            setSubmissionStatus("Message sent!");
            console.log("Message submitted:", message);
        }
    };

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
                            <td 
                                onClick={() => openPopup(student)} 
                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            >
                                {student.email}
                            </td>
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

            {/* Popup Overlay */}
            {popupVisible && selectedStudent && (
                <div 
                    className={styles.popup_overlay} 
                    onClick={(e) => e.target.className === styles.popup_overlay && closePopup()} 
                >
                    <div className={styles.popup}>
                        <span 
                            className={styles.close} 
                            onClick={closePopup} 
                        >
                            &times;
                        </span>
                        <div className={styles.popup_content}>
                            <p>Send an email to: {selectedStudent.firstName} {selectedStudent.lastName}</p>
                            <p>Email: {selectedStudent.email}</p> {/* Display selected email */}

                            {/* Message Textarea */}
                            <textarea 
                                className={styles.messageTextArea}
                                placeholder="Enter your message"
                                value={message}
                                onChange={handleMessageChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />

                            {/* Submit Button */}
                            <button 
                                className={styles.submitButton} 
                                onClick={handleSubmit}
                            >
                                Submit Message
                            </button>

                            {/* Submission Status */}
                            {submissionStatus && <p className={styles.submissionStatus}>{submissionStatus}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewDashboardSummary;
