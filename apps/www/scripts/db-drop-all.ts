import { Pool } from "pg";

async function dropAll() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO public;
    `);
    console.log("All tables dropped successfully!");
  } catch (error) {
    console.error("Error dropping tables:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

dropAll();
