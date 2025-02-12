import { current_user } from '@/lib/server-utils'
import Lesson from './lesson'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const user = await current_user()

  const auth = !!user?.id

  return <Lesson slug={slug} auth={auth} />
}
