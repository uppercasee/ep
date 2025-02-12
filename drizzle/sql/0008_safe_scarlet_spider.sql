CREATE TYPE "public"."payment_method" AS ENUM('esewa', 'khalti', 'ime_pay', 'bank_transfer', 'stripe');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('success', 'pending', 'failed');--> statement-breakpoint
ALTER TABLE "payment" RENAME COLUMN "status" TO "paymentStatusEnum";--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "course_id" uuid;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "payment_method" "payment_method" DEFAULT 'esewa';--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "transaction_id" varchar(100);--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;