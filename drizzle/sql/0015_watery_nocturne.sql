CREATE TYPE "public"."quest_type" AS ENUM('lessons_completed', 'quiz_answers', 'xp_earned');--> statement-breakpoint
ALTER TABLE "user_quests" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user_quests" CASCADE;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "type" "quest_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "target" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "claimed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "quest" ADD CONSTRAINT "quest_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "quest" DROP COLUMN "points";