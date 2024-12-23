import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) {
    redirect("/");
  }
  const user = await currentUser();

  return (
    <>
      <div className="m-2 text-xl">
        Welcome Back, <span>{user?.username}</span>
      </div>
      <div>Continue Studying.....</div>
      <div>My Course Cards</div>
      <div>Explore Courses....</div>
      <div>Popular Course Cards</div>
    </>
  );
};

export default Page;
