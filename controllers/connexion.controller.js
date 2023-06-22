const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  try {
    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Passwords match, user is authenticated
    // You can generate a token or set a session here
    // Return a success response
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};
