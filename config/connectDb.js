const mysql = require("mysql2/promise");

let db; // Variable to hold the connection

const connectToDb = async () => {
  try {
    db = await mysql.createConnection({
      host: "localhost", // Replace with your database host
      user: "root", // Replace with your MySQL username
      password: "admin", // Replace with your MySQL password
      database: "express_mysql", // Replace with your database name
    });
    console.log("Connected to MySQL!");
    return db; // Return the connection instance
  } catch (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); // Exit if unable to connect
  }
};

module.exports = { connectToDb };
