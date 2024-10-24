import React, { useState } from 'react';
import Header from '../components/header.jsx';
import styles from "../styles/NewTeam.module.css";

function NewTeam() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [teamName, setTeamName] = useState('');
    const teamMembers = [
        "Haichuan Li",
        "Hoang Vu Luu",
        "Jeremie",
        "Aymen",
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

        if (term === '') {
            setResults([]);
        } else {
            const filteredResults = teamMembers.filter(member =>
                member.toLowerCase().includes(term.toLowerCase())
            );
            setResults(filteredResults);
        }
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    return (
        <>
            <Header />
            <div className={styles.NewTeam}>

                {/* TEAM INPUT NAME */}
                <div className={styles.teamNameContainer}>
                    <input 
                        type="text" 
                        placeholder="Enter Team Name" 
                        value={teamName} 
                        onChange={handleTeamNameChange}
                        className={styles.teamNameInput}
                    />
                </div>

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
                                    <li key={index} className={styles.resultItem}>
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            searchTerm && <p>No results found.</p>
                        )}
                    </div>
                </div>

                {/* Green Create Button */}
                <button className={styles.createButton}>Create</button>
            </div>
        </>
    );
}

export default NewTeam;
