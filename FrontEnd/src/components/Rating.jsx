import React, { useState } from 'react';
import DimensionRating from './DimensionRating';
import axios from "axios";

const Rating = () => {
    const dimensions = ['Cooperation', 'Conceptual Contribution', 'Practical Contribution', 'Work Ethic'];
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});


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

        const data = {
            ratings: {
                Cooperation: ratings['Cooperation'] || 0,
                'Conceptual Contribution': ratings['Conceptual Contribution'] || 0,
                'Practical Contribution': ratings['Practical Contribution'] || 0,
                'Work Ethic': ratings['Work Ethic'] || 0
            },
            // Optional comments, if undefined, default to an empty string
            comments: {
                Cooperation: comments['Cooperation'] || '',
                'Conceptual Contribution': comments['Conceptual Contribution'] || '',
                'Practical Contribution': comments['Practical Contribution'] || '',
                'Work Ethic': comments['Work Ethic'] || ''
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
