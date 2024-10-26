import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import styles from "../styles/NewTeam.module.css";
import axios from "axios";

function NewTeam() {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamName, setTeamName] = useState('');
    const [newTeam, setNewTeam] = useState([]);
    const [students, setStudents] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');
                setStudents(response.data);
                setResults(response.data); // Initialize results to show all students initially
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const handleTeamCreation = async () => {

        try {
            const response = await axios.post("http://localhost:3000/", { newTeam, teamName });

        } catch (error) {
            console.error("Error creation");
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
