import React, { useEffect, useState } from "react";
import styles from "../styles/ReviewsDashboard.module.css";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import axios from "axios";

const sendEmail = async (recipientEmail, body) => {
    try {
      const response = await axios.post('http://localhost:3000/email', {
        email: recipientEmail,
        subject: 'You have a new message from your instructor',
        message: body,
      });
      if (response.data.success) {
        console.log('Email sent successfully!');
        console.log(recipientEmail);
      } else {
        console.error('Error sending email:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending email:', error.response ? error.response.data : error.message);
    }
  };

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

            if (column === 'firstName') {
                // Case-insensitive sorting for firstName
                valueA = a.firstName?.toString().toLowerCase() || "";
                valueB = b.firstName?.toString().toLowerCase() || "";
            } else if (column === 'lastName') {
                // Case-insensitive sorting for lastName
                valueA = a.lastName?.toString().toLowerCase() || "";
                valueB = b.lastName?.toString().toLowerCase() || "";
            } else if (column === 'email') {
                // Case-insensitive sorting for email
                valueA = a.email?.toString().toLowerCase() || "";
                valueB = b.email?.toString().toLowerCase() || "";
            } else if (column === 'teams') {
                valueA = a.teams?.toString().toLowerCase() || "No Team";
                valueB = b.teams?.toString().toLowerCase() || "No Team";
            } else if (column === 'average') {
                valueA = calculateAverageRating(a.reviews).OverallAverage;
                valueB = calculateAverageRating(b.reviews).OverallAverage;
            } else if (column === 'reviews') {
                valueA = a.reviews?.length || 0; // Default to 0 if undefined
                valueB = b.reviews?.length || 0;
            }  else {
                // For individual ratings like CooperationRating, ConceptualContributionRating, etc.
                valueA = calculateAverageRating(a.reviews)[column];
                valueB = calculateAverageRating(b.reviews)[column];
            }

            // Convert "N/A" to infinity for sorting, ensuring "N/A" appears last
            if (valueA === "N/A") valueA = order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
            if (valueB === "N/A") valueB = order === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

            if (order === 'asc') return valueA > valueB ? 1 : -1;
            return valueA < valueB ? 1 : -1;
        });

        setFilteredStudents(sortedStudents);
    };


    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null); // Store the full student object
    const [message, setMessage] = useState("Enter your message."); // State to manage message input
    const [submissionStatus, setSubmissionStatus] = useState(""); // State to manage submission status

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
            sendEmail(selectedStudent.email, message);
            setSubmissionStatus("Message sent!");
            console.log("Message submitted:", message);
        }
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
                            <td
                                onClick={() => openPopup(student)}
                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            >
                                {student.email}
                            </td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.teams || "No Team"}</td> {/* Handle null team names */}
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
