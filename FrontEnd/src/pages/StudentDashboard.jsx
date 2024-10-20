import React, {useContext} from "react";
import {GlobalContext} from "../GlobalStateProvider.jsx";
import Comments from "../components/Comments.jsx";
import Rating from "../components/Rating.jsx";

function StudentDashboard() {

    const { state, dispatch } = useContext(GlobalContext);


    return (

        <>
            <Rating/>
            <Comments/>

        </>


    )
}

export default StudentDashboard;