import React, {useContext} from "react";
import {GlobalContext} from "../GlobalStateProvider.jsx";
import Comments from "../components/Comments.jsx";
import Rating from "../components/Rating.jsx";
import styles from "../styles/StudentDashboard.module.css";
import Header from '../components/header.jsx';


function ReviewForm() {

    const { state, dispatch } = useContext(GlobalContext);


    return (

        <>
            <Header></Header>

            <div className={styles.reviewDiv}>
                
            <h2>Leave a review for: </h2><br></br>

            <Rating/>
            <Comments/>

            </div>
        </>


    )
}

export default ReviewForm;