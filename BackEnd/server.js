// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Set up MySQL database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Z33h#YNgS2dzlGT#o#t',
    database: 'user_accounts'
});

// API endpoint to handle user registration
app.post('/register', async (req, res) => {
    const { type, email, password } = req.body;

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const query = 'INSERT INTO users (type, email, password) VALUES (?, ?, ?)';
        
        db.query(query, ['user', email, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database error', error });
            }
            return res.status(200).json({ message: 'User registered successfully!' });
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error hashing password', error: err });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
