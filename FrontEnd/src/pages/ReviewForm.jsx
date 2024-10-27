import React, {useContext} from "react";
import {GlobalContext} from "../GlobalStateProvider.jsx";
import Comments from "../components/Comments.jsx";
import Rating from "../components/Rating.jsx";
import styles from "../styles/StudentDashboard.module.css";
import Header from '../components/header.jsx';
import {useNavigate} from "react-router-dom";
import Success from "../components/Success.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";


function ReviewForm() {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();



    return (

        <>
            {state.success && <Success/>}
            {state.loading && <Loading/>}
            {state.error && <Error/>}
            <Header></Header>

            <div className={styles.reviewDiv}>
                
            <h2>Leave a review for: {state.student?.name}</h2><br></br>

            <Rating/>
            <Comments/>
                <button onClick={() => navigate('/studentDashboard')}>back</button>

            </div>
        </>


    )
}

export default ReviewForm;