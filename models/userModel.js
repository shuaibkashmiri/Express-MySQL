const { connectToDb } = require("../config/connectDb");

const createUsersTable = async () => {
  try {
    const db = await connectToDb(); // Ensure the connection is established
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await db.query(createTableQuery); // Use `query` for executing the SQL
    console.log("Users table created or already exists!");
  } catch (err) {
    console.error("Error creating users table:", err.message);
  }
};

createUsersTable(); // Call the function to ensure the table is created

module.exports = createUsersTable;
