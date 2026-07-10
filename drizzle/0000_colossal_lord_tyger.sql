CREATE TABLE "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"context" text NOT NULL,
	"note" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"period" text NOT NULL,
	"summary" text NOT NULL,
	"highlights" text[] NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"slug" varchar(64) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tier" varchar(16) NOT NULL,
	"status" varchar(16) NOT NULL,
	"year" varchar(8) NOT NULL,
	"stack" text NOT NULL,
	"tagline" text NOT NULL,
	"summary" text NOT NULL,
	"story" text[] NOT NULL,
	"highlights" text[] NOT NULL,
	"metrics" text[] NOT NULL,
	"repo_url" text NOT NULL,
	"demo_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "projects_tier_sort_idx" ON "projects" USING btree ("tier","sort_order");