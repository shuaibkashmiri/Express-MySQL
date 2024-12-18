const { connectToDb } = require("../config/connectDb");

const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await connectToDb(); // Get the database connection

    // Check if the email already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(insertUserQuery, [name, email, password]);

    // Respond with success
    res.status(201).json({
      message: "User registered successfully!",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerHandler };
