import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeammateSelection from './pages/TeammateSelection';
import Register from "./pages/Register";
import {GlobalStateProvider} from "./GlobalStateProvider.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import ReviewForm from './pages/ReviewForm.jsx';





const router = createBrowserRouter([
    {path : "/", element : <Home />},
    {path : "/login", element : <Login />},
    {path : "/register", element : <Register />},
    {path : "/studentDashboard", element: <StudentDashboard/>},
    {path : "/instructorDashboard", element : <InstructorDashboard/>},
    {path : "/reviewForm", element : <ReviewForm/>}
]);

export default function App() {

    return (
        <GlobalStateProvider>
            <RouterProvider router={router}></RouterProvider>
        </GlobalStateProvider>



    );
}
