import Hero from "@/components/sections/hero";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId }: { userId: string | null } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <Hero />
      <div> Features</div>
      <div> PopularCourse</div>
      <div> GamificationSection</div>
      <div> SocialProof</div>
      <div> FAQSection</div>
      <div> Testimonials</div>
      <div> Footer</div>
    </>
  );
};

export default Home;
