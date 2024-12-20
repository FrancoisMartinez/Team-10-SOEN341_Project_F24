import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import styles from "../styles/FileImport.module.css";

function FileImport() {
    const [csvFile, setCsvFile] = useState(null); // Store selected file
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    // Handle the file upload and store the selected file
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/csv") {
            setCsvFile(file); // Store file for upload
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    // Function to upload file to the backend
    const uploadFileToBackend = async () => {
        if (!csvFile) {
            alert("Please select a CSV file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', csvFile); // Append the CSV file to the form data

        try {
            setIsLoading(true); // Set loading state
            const response = await fetch('/BackEnd/routes/upload_csv.php', { // Updated path
                method: 'POST',
                body: formData,
            });

            const result = await response.text();
            alert(result); // Show response from the backend (success or error message)
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("There was an error uploading the file. Please try again.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Handle Import button click: upload file and navigate
    const handleImportButtonClick = async () => {
        await uploadFileToBackend(); // Upload file to the backend
        navigate('/newTeam'); // Navigate to NewTeam page after upload
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

            {/* Show loading message when uploading */}
            {isLoading && <p className={styles.loadingMessage}>Uploading file, please wait...</p>}

            {/* Import Button */}
            <button className={styles.ImportButton} onClick={handleImportButtonClick} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Import"}
            </button>
        </>
    );
}

export default FileImport;
