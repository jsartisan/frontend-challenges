-- Migration from NextAuth to Better Auth schema
-- This will clear existing sessions and accounts (users and completions preserved)

-- Drop old tables that will be recreated
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "verificationToken" CASCADE;

-- Update user table: change emailVerified from timestamp to boolean
ALTER TABLE "user" ALTER COLUMN "emailVerified" TYPE boolean USING CASE WHEN "emailVerified" IS NOT NULL THEN true ELSE false END;
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT false;
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET NOT NULL;

-- Make name and email required (set defaults for any null values first)
UPDATE "user" SET "name" = 'User' WHERE "name" IS NULL;
UPDATE "user" SET "email" = CONCAT('user_', "id", '@placeholder.local') WHERE "email" IS NULL;
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;

-- Create new session table for Better Auth
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);

-- Create new account table for Better Auth
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"idToken" text,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create new verification table for Better Auth
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key constraints
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
