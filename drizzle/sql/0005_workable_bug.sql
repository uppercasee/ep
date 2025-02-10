ALTER TABLE "content" DROP CONSTRAINT "content_lesson_id_lessons_id_fk";
--> statement-breakpoint
ALTER TABLE "content" DROP CONSTRAINT "content_quiz_id_quiz_id_fk";
--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;