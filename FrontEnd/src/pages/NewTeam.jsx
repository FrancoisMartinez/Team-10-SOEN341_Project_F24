import React, { useState } from 'react';
import Header from '../components/header.jsx';
import styles from "../styles/NewTeam.module.css";

function NewTeam() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [newTeam, setNewTeam] = useState([]); // Array to store selected members

    const teamMembers = [
        "Haichuan Li",
        "Hoang Vu Luu",
        "Jeremie",
        "Ayman",
        "Francois",
        "Varun",
        "Jeffrey",
        "Julia",
        "Yann",
        "Melina",
        "Steven",
        "Lam",
        "Tyson",
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
        // Add the selected member to the newTeam array if not already added
        if (!newTeam.includes(member)) {
            setNewTeam([...newTeam, member]);
        }
    };

    const handleRemoveMember = (member) => {
        // Remove the member from the newTeam array
        setNewTeam(newTeam.filter((m) => m !== member));
    };

    return (
        <>
            <Header />
            <div className={styles.NewTeam}>

                {/* Team Name Input on the top-left */}
                <div className={styles.teamNameInputContainer}>
                    <input 
                        type="text" 
                        placeholder="Enter Team Name" 
                        value={teamName} 
                        onChange={handleTeamNameChange}
                        className={styles.teamNameInput}
                    />
                </div>

                {/* Wrapper to hold both search bar and selected members side by side */}
                <div className={styles.flexContainer}>
                    
                    {/* Search Bar and Results */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>Search</button>

                        <div className={styles.resultsContainer}>
                            {results.length > 0 ? (
                                <ul className={styles.resultsList}>
                                    {results.map((result, index) => (
                                        <li 
                                            key={index} 
                                            className={styles.resultItem} 
                                            onClick={() => handleSelectMember(result)} // Select member on click
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

                    {/* Selected team members box */}
                    <div className={styles.newTeamContainer}>
                        <h3>Selected Team Members:</h3>
                        <ul className={styles.newTeamList}>
                            {newTeam.map((member, index) => (
                                <li key={index} className={styles.newTeamItem}>
                                    {member}
                                    {/* Remove button */}
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

                {/* Green Create Button */}
                <button className={styles.createButton}>Create</button>

                {/*  CSV Button */}
                <button className={styles.CSVbutton}>Import File</button>
            </div>
        </>
    );
}

export default NewTeam;
