import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import styles from "../styles/NewTeam.module.css";
import axios from "axios";
import {GlobalContext} from "../GlobalStateProvider.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import Success from "../components/Success.jsx";

function NewTeam() {
    const { state, dispatch } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [teamName, setTeamName] = useState('');
    const [newTeam, setNewTeam] = useState([]);
    const [students, setStudents] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'REQUEST' })
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');

                if (response.status === 200) {
                    dispatch({ type: 'SUCCESS' })
                    setStudents(response.data);
                    setResults(response.data); // Initialize results to show all students initially
                }

            } catch (error) {
                console.error("Error fetching students:", error);
                dispatch({
                    type: 'ERROR',
                    payload: error.response?.data?.error || 'Error fetching students. Please try again.'
                });
            }
        };

        fetchStudents();
    }, []);

    const handleTeamCreation = async () => {
        dispatch({ type: 'REQUEST' })

        const data = {
            members: newTeam,
            teamName: teamName,
            instructor: state.user?.instructor || false
        }

        if (newTeam.length < 2) {
            dispatch({
                type: 'ERROR',
                payload: 'At least 2 student must be chosen to create a team',
            })
            return;
        } else if (teamName.length < 1) {
            dispatch({
                type: 'ERROR',
                payload: 'You must enter a team name',
            })
            return;
        }



        try {
            const response = await axios.post("http://localhost:3000/add-team", data);

            if (response.status === 200) {
                dispatch({
                    type: 'SUCCESS',
                    payload: 'Team successfully created.'
                })
                setNewTeam([])
                setTeamName('')
            }


        } catch (error) {
            console.error("Error creation");
            dispatch({
                type: 'ERROR',
                payload: error.response?.data?.error || 'Error fetching creating team. Please try again.'
            });
            setNewTeam([])
            setTeamName('')
        }

    }

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredResults = students.filter(member =>
            member.firstName.toLowerCase().includes(term.toLowerCase()) ||
            member.lastName.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filteredResults);
    };



    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSelectMember = (member) => {
        if (!newTeam.some(m => m._id === member._id)) { // Check by unique ID if available
            setNewTeam([...newTeam, member]);
        }
    };

    const handleRemoveMember = (member) => {
        setNewTeam(newTeam.filter((m) => m._id !== member._id));
    };

    return (
        <>
            {state.success && <Success/>}
            {state.loading && <Loading/>}
            {state.error && <Error/>}

            <Header />
            <div className={styles.NewTeam}>
                <div className={styles.teamNameInputContainer}>
                    <input
                        type="text"
                        placeholder="Enter Team Name"
                        value={teamName}
                        onChange={handleTeamNameChange}
                        className={styles.teamNameInput}
                    />
                </div>

                <div className={styles.flexContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className={styles.searchInput}
                        />

                        <div className={styles.resultsContainer}>
                            {results.length > 0 ? (
                                <ul className={styles.resultsList}>
                                    {results.map((result, index) => (
                                        <li
                                            key={index}
                                            className={styles.resultItem}
                                            onClick={() => handleSelectMember(result)}
                                        >
                                            {result.firstName} {result.lastName}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                searchTerm && <p>No results found.</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.newTeamContainer}>
                        <h3>Selected Team Members:</h3>
                        <ul className={styles.newTeamList}>
                            {newTeam.map((member, index) => (
                                <li key={index} className={styles.newTeamItem}>
                                    {member.firstName} {member.lastName}
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveMember(member)}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button onClick={handleTeamCreation} className={styles.createButton}>Create</button>

                {/* CSV Button */}
                <button
                    className={styles.CSVbutton}
                    onClick={() => navigate('/fileImport')}
                >
                    Import File
                </button>
            </div>
        </>
    );
}

export default NewTeam;
