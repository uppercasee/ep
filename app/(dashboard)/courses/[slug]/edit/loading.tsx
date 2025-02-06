import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col text-balance gap-0.5 pb-1">
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-2/3 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>

      <div className="flex flex-col xl:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full xl:w-1/2">
          <Skeleton className="h-8 w-3/4" />
          <Separator />
          <Skeleton className="h-6 w-full" />
          <Separator />
          <Skeleton className="h-48 sm:h-60 md:h-72 w-full" />
          <Separator />
          <Skeleton className="h-6 w-2/3" />
          <Separator />
          <Skeleton className="h-6 w-1/3" />
          <Separator />
          <Skeleton className="h-6 w-1/2" />
          <Separator />
        </div>

        <Separator orientation="vertical" className="h-auto mx-2" />

        <div className="flex flex-col gap-2 w-full xl:w-1/2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    </main>
  )
}
