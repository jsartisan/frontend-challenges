import { Pool } from "pg";

const NEW_DB_URL = process.env.DATABASE_URL!;

async function migrate() {
  // Use session mode (port 6543) instead of transaction mode
  const supabasePool = new Pool({
    connectionString: "",
  });
  const newPool = new Pool({ connectionString: NEW_DB_URL });

  try {
    console.log("Connecting to databases...");

    // 1. Fetch auth users from Supabase
    console.log("\n1. Fetching auth users from Supabase...");
    const authUsersResult = await supabasePool.query(`
      SELECT id, email, email_confirmed_at, created_at, updated_at
      FROM auth.users
    `);
    console.log(`   Found ${authUsersResult.rows.length} auth users`);

    // 2. Fetch profiles from Supabase
    console.log("\n2. Fetching profiles from Supabase...");
    const profilesResult = await supabasePool.query(`
      SELECT id, name, user_name, avatar_url
      FROM profiles
    `);
    console.log(`   Found ${profilesResult.rows.length} profiles`);

    // 3. Fetch completions from Supabase
    console.log("\n3. Fetching completions from Supabase...");
    const completionsResult = await supabasePool.query(`
      SELECT id, user_id, challenge_id, created_at
      FROM completions
    `);
    console.log(`   Found ${completionsResult.rows.length} completions`);

    // 4. Create a map of profiles by user id
    const profilesMap = new Map<string, any>();
    for (const profile of profilesResult.rows) {
      profilesMap.set(profile.id, profile);
    }

    // 5. Migrate users (merge auth.users + profiles)
    console.log("\n4. Migrating users to new database...");
    let usersInserted = 0;
    for (const authUser of authUsersResult.rows) {
      const profile = profilesMap.get(authUser.id);

      try {
        await newPool.query(
          `
          INSERT INTO "user" (id, email, "emailVerified", name, image, "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO NOTHING
        `,
          [
            authUser.id,
            authUser.email,
            authUser.email_confirmed_at,
            profile?.name || profile?.user_name || null,
            profile?.avatar_url || null,
            authUser.created_at,
            authUser.updated_at || new Date(),
          ]
        );
        usersInserted++;
      } catch (err: any) {
        console.error(`   Error inserting user ${authUser.id}:`, err.message);
      }
    }
    console.log(`   Inserted ${usersInserted} users`);

    // 6. Migrate completions
    console.log("\n5. Migrating completions to new database...");
    let completionsInserted = 0;
    for (const completion of completionsResult.rows) {
      try {
        await newPool.query(
          `
          INSERT INTO completion (id, "userId", "challengeId", "createdAt")
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING
        `,
          [
            completion.id,
            completion.user_id,
            completion.challenge_id,
            completion.created_at || new Date(),
          ]
        );
        completionsInserted++;
      } catch (err: any) {
        console.error(`   Error inserting completion ${completion.id}:`, err.message);
      }
    }
    console.log(`   Inserted ${completionsInserted} completions`);

    // 7. Migrate GitHub OAuth accounts
    console.log("\n6. Migrating GitHub OAuth accounts...");
    const identitiesResult = await supabasePool.query(`
      SELECT user_id, provider, identity_data
      FROM auth.identities
      WHERE provider = 'github'
    `);
    console.log(`   Found ${identitiesResult.rows.length} GitHub identities`);

    let accountsInserted = 0;
    for (const identity of identitiesResult.rows) {
      try {
        const providerAccountId = identity.identity_data?.sub || identity.identity_data?.id;
        if (!providerAccountId) continue;

        await newPool.query(
          `
          INSERT INTO account ("userId", type, provider, "providerAccountId")
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (provider, "providerAccountId") DO NOTHING
        `,
          [identity.user_id, "oauth", "github", String(providerAccountId)]
        );
        accountsInserted++;
      } catch (err: any) {
        console.error(`   Error inserting account for user ${identity.user_id}:`, err.message);
      }
    }
    console.log(`   Inserted ${accountsInserted} accounts`);

    console.log("\n✅ Migration completed successfully!");
    console.log("\nSummary:");
    console.log(`   - Users: ${usersInserted}`);
    console.log(`   - Completions: ${completionsInserted}`);
    console.log(`   - OAuth Accounts: ${accountsInserted}`);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await supabasePool.end();
    await newPool.end();
  }
}

migrate();
