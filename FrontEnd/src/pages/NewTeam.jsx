import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/header.jsx';
import styles from "../styles/NewTeam.module.css";


function NewTeam() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [newTeam, setNewTeam] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    const teamMembers = [
        "Haichuan Li", "Hoang Vu Luu", "Jeremie", "Ayman", "Francois", 
        "Varun", "Jeffrey", "Julia", "Yann", "Melina", "Steven", "Lam", "Tyson",
    ];

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredResults = teamMembers.filter(member =>
            member.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filteredResults);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSelectMember = (member) => {
        if (!newTeam.includes(member)) {
            setNewTeam([...newTeam, member]);
        }
    };

    const handleRemoveMember = (member) => {
        setNewTeam(newTeam.filter((m) => m !== member));
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
                                            {result}
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
                                    {member}
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

                <button className={styles.createButton}>Create</button>

                {/* CSV Button */}
                <button 
                    className={styles.CSVbutton} 
                    onClick={() => navigate('/fileImport')} // Navigate to FileImport page on click
                >
                    Import File
                </button>
            </div>
        </>
    );
}

export default NewTeam;
