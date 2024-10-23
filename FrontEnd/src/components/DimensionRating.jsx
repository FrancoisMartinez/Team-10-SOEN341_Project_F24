import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const DimensionRating = ({ dimension, handleRatingChange, handleCommentChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleStarClick = (ratingValue) => {
        setRating(ratingValue);
        handleRatingChange(dimension, ratingValue); // Pass rating back to parent
    };

    const handleCommentInput = (event) => {
        setComment(event.target.value);
        handleCommentChange(dimension, event.target.value); // Pass comment back to parent
    };

    return (
        <div className="dimension-rating">
            <h3>{dimension}</h3>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name={`${dimension}-rating`}
                                value={ratingValue}
                                onClick={() => handleStarClick(ratingValue)}
                                style={{ display: 'none' }}
                            />
                            <FaStar
                                className="star"
                                color={ratingValue <= (hoverRating || rating) ? 'gold' : 'gray'}
                                size={24}
                                onMouseEnter={() => setHoverRating(ratingValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleStarClick(ratingValue)}
                            />
                        </label>
                    );
                })}
            </div>
            <textarea
                placeholder={`Optional comment for ${dimension}`}
                value={comment}
                onChange={handleCommentInput}
                rows="4"
                cols="50"
                style={{ resize: 'none', overflowY: 'auto' }}

            />
        </div>
    );
};

export default DimensionRating;
