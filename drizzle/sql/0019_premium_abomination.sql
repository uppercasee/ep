ALTER TABLE "content" DROP CONSTRAINT "content_lesson_id_lessons_id_fk";
--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;