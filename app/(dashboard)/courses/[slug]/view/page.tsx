import Lesson from './lesson'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  return <Lesson slug={slug} />
}
