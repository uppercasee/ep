import React from 'react'
import Navbar from '../nav/navbar'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg pt-14">
        <h1 className="text-4xl font-bold text-center mb-8 text-card-foreground">
          About Us
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>
          <p className="text-secondary-foreground">
            At <strong>Study With Us</strong>, we are on a mission to
            revolutionize learning through the power of gamification. Our goal
            is to create an engaging, interactive, and enjoyable learning
            environment where students can thrive while having fun. Whether
            you're studying for exams, mastering new skills, or exploring new
            topics, we're here to support you every step of the way.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Story
          </h2>
          <p className="text-secondary-foreground">
            <strong>Study With Us</strong> was founded by a team of passionate
            educators, developers, and designers who saw a gap in the
            traditional learning experience. We wanted to create something that
            not only made learning fun but also fostered collaboration,
            creativity, and personal growth. Since our inception, we've been
            working hard to build a platform that combines the best of education
            and gaming, making learning a truly enjoyable experience.
          </p>
        </section>

        {/* <section className="mb-6"> */}
        {/*   <h2 className="text-2xl font-semibold mb-4 text-primary">Our Team</h2> */}
        {/*   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        {/*     <Card className="bg-card p-4 rounded-lg shadow-md text-center"> */}
        {/*       <h3 className="text-xl font-semibold text-primary">Jane Doe</h3> */}
        {/*       <p className="">CEO & Co-Founder</p> */}
        {/*       <p className=""> */}
        {/*         Jane is a passionate educator and visionary leader who believes in */}
        {/*         making learning more accessible and enjoyable for everyone. */}
        {/*       </p> */}
        {/*     </Card> */}
        {/*     <Card className="bg-card p-4 rounded-lg shadow-md text-center"> */}
        {/*       <h3 className="text-xl font-semibold text-primary">John Smith</h3> */}
        {/*       <p className="">CTO & Co-Founder</p> */}
        {/*       <p className=""> */}
        {/*         John is a software engineer who loves combining technology with */}
        {/*         creativity to build engaging learning experiences. */}
        {/*       </p> */}
        {/*     </Card> */}
        {/*     <Card className="bg-card p-4 rounded-lg shadow-md text-center"> */}
        {/*       <h3 className="text-xl font-semibold text-primary"> */}
        {/*         Alice Johnson */}
        {/*       </h3> */}
        {/*       <p className="">Lead Designer</p> */}
        {/*       <p className=""> */}
        {/*         Alice is the creative mind behind our platform's user interface, */}
        {/*         ensuring a seamless and fun experience for all users. */}
        {/*       </p> */}
        {/*     </Card> */}
        {/*   </div> */}
        {/* </section> */}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Why Choose Us?
          </h2>
          <p className="text-secondary-foreground">
            There are many online learning platforms out there, but none quite
            like <strong>Study With Us</strong>. Here's why:
          </p>
          <ul className="list-disc ml-6 text-secondary-foreground">
            <li>
              We combine the best of education and gaming to keep you motivated
              and engaged.
            </li>
            <li>
              Our platform is designed to help you learn at your own pace, with
              features like gamification, challenges, and rewards.
            </li>
            <li>
              We are a team of passionate individuals who truly care about your
              learning experience and success.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Contact Us
          </h2>
          <p className="text-secondary-foreground">
            Have any questions or want to learn more? Feel free to reach out to
            us:
            <br />
            <strong>Email:</strong> support@studywithus.com
          </p>
        </section>
      </div>
    </>
  )
}

export default AboutUs
