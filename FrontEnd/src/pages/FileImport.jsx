import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/header.jsx';
import styles from "../styles/FileImport.module.css";

function FileImport() {
    const [csvContent, setCsvContent] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    // Handle the file upload and parse the CSV
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/csv") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setCsvContent(content); // Store file content in state
                // You can also send the content to a backend server here if needed
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    // Navigate back to the NewTeam page
    const handleImportButtonClick = () => {
        navigate('/newTeam'); // Navigates back to NewTeam page
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.heading}>Upload a CSV file</h2>
                <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileUpload} 
                    className={styles.fileInput}
                />
            </div>

            {/* Import Button */}
            <button className={styles.ImportButton} onClick={handleImportButtonClick}>
                Import
            </button>
        </>
    );
}

export default FileImport;
