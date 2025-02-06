import CourseSkeleton from '@/components/skeletons/courseSkeleton'
import { Button } from '@/components/ui/button'
import { current_user } from '@/lib/server-utils'
import Link from 'next/link'
import { Suspense } from 'react'
import DailyQuestWidget from './_components/dailyQuestWidget'
import LeaderboardWidget from './_components/leaderboardWidget'
import MyCourseSection from './_components/myCourses'

const Page = async () => {
  const user = await current_user()

  return (
    <>
      <div className="flex flex-col 2xl:flex-row gap-8 lg:gap-2 justify-between">
        <div className="flex flex-col gap-6 w-full mr-8">
          <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
            <div className="text-xl font-bold">
              Welcome Back,
              <Suspense fallback={'Loadiing...'}>
                <span> {user?.username}</span>
              </Suspense>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/explore">
                <Button>Explore New Courses</Button>
              </Link>
            </div>
          </div>
          {/* <div className="gap-2 flex flex-col"> */}
          {/*   <div className="text-md font-semibold">Continue Studying.....</div> */}
          {/*   <CurrentCourseSection /> */}
          {/* </div> */}
          <div className="gap-2 flex flex-col">
            <div className="text-md font-semibold">Continue Studying...</div>
            <div>
              <Suspense fallback={<CourseSkeleton />}>
                <MyCourseSection />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row 2xl:flex-col justify-between md:justify-start gap-2 2xl:gap-4">
          <LeaderboardWidget />
          <DailyQuestWidget />
        </div>
      </div>
    </>
  )
}

export default Page
