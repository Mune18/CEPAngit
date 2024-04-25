// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import cors package

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cepa_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define route to handle login requests
app.post('/login', (req, res) => {
  const { adminID, adminPass } = req.body;

  // Check if provided credentials match those in the database
  const query = 'SELECT * FROM adminlogin WHERE adminID = ? AND adminPass = ?';
  db.query(query, [adminID, adminPass], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Error checking credentials' });
      return;
    }
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful'});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
