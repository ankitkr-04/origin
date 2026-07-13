CREATE TABLE "achievement_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"label" text NOT NULL,
	"detail" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "educations" (
	"id" text PRIMARY KEY NOT NULL,
	"degree" text NOT NULL,
	"institution" text NOT NULL,
	"period" text NOT NULL,
	"cgpa" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "identity" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"headline" text NOT NULL,
	"headline_parts" text[] NOT NULL,
	"positioning" text NOT NULL,
	"location" text NOT NULL,
	"email" text NOT NULL,
	"github_url" text NOT NULL,
	"about_narrative" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"file_url" text NOT NULL,
	"focus_areas" text[] NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"href" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "resumes_one_current_idx" ON "resumes" USING btree ("is_current") WHERE "resumes"."is_current" = true;