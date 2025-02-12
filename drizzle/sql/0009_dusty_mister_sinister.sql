ALTER TABLE "payment" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_xp_update" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "streak" integer DEFAULT 0;