ALTER TABLE "content" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "content" ALTER COLUMN "lesson_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "content" ALTER COLUMN "quiz_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "course_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;