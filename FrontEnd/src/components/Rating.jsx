import React, {useContext, useState} from 'react';
import DimensionRating from './DimensionRating';
import axios from "axios";
import {GlobalContext} from "../GlobalStateProvider.jsx";
import styles from "../styles/StudentDashboard.module.css";
import {useNavigate} from "react-router-dom";

const sendReviewEmail = async (recipientEmail) => {
    try {
      const response = await axios.post('http://localhost:3000/email', {
        email: recipientEmail,
        subject: 'You have a new review!',
        message: 'You’ve received a new peer review. Log in to check it out!',
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


function Rating() {
    const { state, dispatch } = useContext(GlobalContext);
    const dimensions = ['Cooperation', 'Conceptual Contribution', 'Practical Contribution', 'Work Ethic'];
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});
    const [studentEmail, setStudentEmail] = useState('');

    const navigate = useNavigate();


    const handleRatingChange = (dimension, ratingValue) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [dimension]: ratingValue,
        }));
    };

    const handleCommentChange = (dimension, commentValue) => {
        setComments((prevComments) => ({
            ...prevComments,
            [dimension]: commentValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'REQUEST'})



        const confirmSubmit = window.confirm("Are you sure you want to submit your assessment?");
        if (!confirmSubmit) {
            return;
        }


        const data = {
            user : {
                studentEmail : state.student.email,
                reviewer : state.user?.email || ''
            },
            ratings: {
                Cooperation: ratings['Cooperation'] || 0,
                ConceptualContribution: ratings['Conceptual Contribution'] || 0,
                PracticalContribution: ratings['Practical Contribution'] || 0,
                WorkEthic: ratings['Work Ethic'] || 0
            },
            comments: {
                Cooperation: comments['Cooperation'] || '',
                ConceptualContribution: comments['Conceptual Contribution'] || '',
                PracticalContribution: comments['Practical Contribution'] || '',
                WorkEthic: comments['Work Ethic'] || ''
            }
        };

        sendReviewEmail(state.student.email);
        console.log("Submitted Data:", data); // To check if all fields are present

        try {
            // Send POST request to backend /ratingSubmission
            const response = await axios.post('http://localhost:3000/reviewSubmission', data);

            if (response.status === 200) {
                dispatch({type: 'SUCCESS'});
            }
            navigate('/studentDashboard')
        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: error.response?.data?.error || 'An error occurred. Please try again.'
            });
        }

    };

    return (
        <div className={styles.ratingContainer}>
            {dimensions.map((dimension, index) => (
                <DimensionRating
                    key={index}
                    dimension={dimension}
                    handleRatingChange={handleRatingChange}
                    handleCommentChange={handleCommentChange}
                />
            ))}
            <button className={styles.submitButton} onClick={handleSubmit}>Submit Peer Assessment</button>
        </div>
    );
};

export default Rating;
