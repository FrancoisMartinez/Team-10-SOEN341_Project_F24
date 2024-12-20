import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeammateSelection from './pages/TeammateSelection';
import Register from "./pages/Register";
import NewTeam from "./pages/NewTeam";
import FileImport from "./pages/FileImport";
import {GlobalStateProvider} from "./GlobalStateProvider.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import ReviewForm from './pages/ReviewForm.jsx';
import UpdateTeam from "./pages/UpdateTeam.jsx";
import ReviewsDashboard from './pages/ReviewsDashboard.jsx';





const router = createBrowserRouter([
    {path : "/", element : <Home />},
    {path : "/login", element : <Login />},
    {path : "/register", element : <Register />},
    {path : "/studentDashboard", element: <StudentDashboard/>},
    {path : "/newTeam", element : <NewTeam />},
    {path : "/updateTeam", element : <UpdateTeam />},
    {path: "/fileImport", element : <FileImport/>},
    {path : "/instructorDashboard", element : <InstructorDashboard/>},
    {path : "/reviewForm", element : <ReviewForm/>},
    {path: '/teammates', element: <TeammateSelection /> },
    {path: '/reviews', element: <ReviewsDashboard /> },

]);

export default function App() {

    return (
        <GlobalStateProvider>
            <RouterProvider router={router}></RouterProvider>
        </GlobalStateProvider>



    );
}
