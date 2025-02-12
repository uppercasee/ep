ALTER TABLE "user_badges" DROP CONSTRAINT "user_badges_user_id_badge_id_pk";--> statement-breakpoint
ALTER TABLE "user_quests" ADD CONSTRAINT "user_quests_user_id_quest_id_pk" PRIMARY KEY("user_id","quest_id");--> statement-breakpoint
ALTER TABLE "user_badges" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_responses" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;