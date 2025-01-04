import CourseCard from '@/components/CourseCard'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Page = async () => {
  const user = await currentUser()

  return (
    <section className="pt-14">
      <div className="m-2 text-xl">
        Welcome Back, <span>{user?.username}</span>
      </div>
      <div>Continue Studying.....</div>
      <div>My Course Cards</div>
      <CourseCard />
      <div>Explore Courses....</div>
      <div className="flex gap-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div>Popular Course Cards</div>
      <div className="flex gap-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div className="bottom-0 left-0">Footer</div>
    </section>
  )
}

export default Page
