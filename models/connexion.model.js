const bcrypt = require("bcrypt");
const db = require("../database"); // Assuming you have a database connection

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM user WHERE user_email = "${email}"`;
  
  try {
    const [rows] = await db.query(query);
    const user = rows[0];

    if (!user) {
      return null;
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Passwords match, return the user object
      return user;
    } else {
      // Passwords do not match
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

module.exports = {
  getUserByEmail,
};
