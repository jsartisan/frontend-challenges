import { Pool } from "pg";

const SUPABASE_URL =
  "postgresql://postgres.tatqdmexdszkwmdwnwbo:R6F3%25JTqV6%24WSf-@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";

async function check() {
  const pool = new Pool({ connectionString: SUPABASE_URL });

  try {
    console.log("Checking Supabase database structure...\n");

    // List all schemas
    const schemas = await pool.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
    `);
    console.log("Schemas:", schemas.rows.map((r) => r.schema_name).join(", "));

    // List all tables in public schema
    const publicTables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log("\nPublic tables:", publicTables.rows.map((r) => r.table_name).join(", ") || "(none)");

    // Check auth schema tables
    const authTables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'auth'
    `);
    console.log("\nAuth tables:", authTables.rows.map((r) => r.table_name).join(", ") || "(none)");

    // Try to count users in auth.users if it exists
    try {
      const userCount = await pool.query(`SELECT COUNT(*) FROM auth.users`);
      console.log("\nAuth users count:", userCount.rows[0].count);
    } catch (e: any) {
      console.log("\nCannot access auth.users:", e.message);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
}

check();
