import React, {useContext, useState} from 'react';
import DimensionRating from './DimensionRating';
import axios from "axios";
import {GlobalContext} from "../GlobalStateProvider.jsx";

function Rating() {
    const { state, dispatch } = useContext(GlobalContext);
    const dimensions = ['Cooperation', 'Conceptual Contribution', 'Practical Contribution', 'Work Ethic'];
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});
    const [studentEmail, setStudentEmail] = useState('');


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
        // dispatch({ type: 'sum'})

        const confirmSubmit = window.confirm("Are you sure you want to submit your assessment?");
        if (!confirmSubmit) {
            return;
        }


        const data = {
            user : {
                studentEmail : studentEmail,
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

        console.log("Submitted Data:", data); // To check if all fields are present

        try {
            // Send POST request to backend /ratingSubmission
            const response = await axios.post('http://localhost:3000/reviewSubmission', data);

            if (response.status === 200) {
                // dispatch({type: 'sum'});
            }
        } catch (error) {
            // dispatch({
            //     type: 'sum',
            //     payload: error.response?.data?.error || 'An error occurred. Please try again.'
            // });
        }

    };

    return (
        <div className="rating-container">
            {dimensions.map((dimension, index) => (
                <DimensionRating
                    key={index}
                    dimension={dimension}
                    handleRatingChange={handleRatingChange}
                    handleCommentChange={handleCommentChange}
                />
            ))}
            <button onClick={handleSubmit}>Submit Peer Assessment</button>
        </div>
    );
};

export default Rating;
