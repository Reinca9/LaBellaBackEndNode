const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

// Create an instance of Express.js
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "labella",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

// Configure Express.js to parse request bodies as JSON
app.use(express.json());

// Handle the registration form submission
app.post("/register", (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  // Perform any necessary validation on the form data

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "An error occurred during registration" });
      return;
    }

    // Prepare and execute the SQL query to insert the user into the database
    const sql =
      "INSERT INTO users (email, password, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [email, hashedPassword, firstName, lastName, phoneNumber],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          res
            .status(500)
            .json({ error: "An error occurred during registration" });
          return;
        }

        // User registration successful
        res.json({ message: "Registration successful" });
      }
    );
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
