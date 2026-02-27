import { Pool } from "pg";

async function verify() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const users = await pool.query(`SELECT COUNT(*) FROM "user"`);
    const completions = await pool.query(`SELECT COUNT(*) FROM completion`);
    const accounts = await pool.query(`SELECT COUNT(*) FROM account`);

    console.log("Migration verification:");
    console.log(`  - Users: ${users.rows[0].count}`);
    console.log(`  - Completions: ${completions.rows[0].count}`);
    console.log(`  - OAuth Accounts: ${accounts.rows[0].count}`);

    // Show sample user
    const sampleUser = await pool.query(`SELECT id, name, email, image FROM "user" LIMIT 3`);
    console.log("\nSample users:");
    sampleUser.rows.forEach((u) => console.log(`  - ${u.name || u.email} (${u.id.slice(0, 8)}...)`));

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
}

verify();
