const express = require("express");
const { connectToDb } = require("./config/connectDb");
const createUsersTable = require("./models/userModel");
const { registerHandler } = require("./controllers/userController");

const app = express();
app.use(express.json());

const PORT = 6000;

// Routes
app.post("/register", registerHandler);

// Ensure database and table setup
(async () => {
  const db = await connectToDb();

  // Ensure the 'users' table is created
  await createUsersTable();

  // Test connection
  await db.query("SELECT 1");

  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
