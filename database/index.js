// Import the 'pg' library
import pg from "pg";
const { Pool } = pg;

// Create a connection pool (change the connection details as per your setup)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // or your database host
  database: 'artfills',
  password: 'postgres',
  port: 5432, // default PostgreSQL port is 5432
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the PostgreSQL database!');
    release(); // Release the client back to the pool
  }
});


export default pool;