import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'

const NewCoursePage = () => {
  return (
    <div className="px-12 flex flex-col gap-6 justify-start ">
      <div className="flex justify-between items-center gap-6">
        <div className="text-balance">
          <div className="text-xl font-bold">Course Setup</div>
          <span className="text-muted-foreground">
            Complete all fields and save your course!!
          </span>
        </div>
        <Button>Save</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex-row items-center gap-1.5">
            <Label>Title</Label>
            <Input type="text" id="title" placeholder="Course Title" />
          </div>

          <div className="flex-row items-center gap-1.5">
            <Label>Description</Label>
            <Textarea
              rows={4}
              className="resize-none"
              id="title"
              placeholder="Course description"
            />
          </div>

          <div className="flex-row items-center gap-1.5">
            <Label>Category</Label>
            <Input type="text" id="title" placeholder="Course Category" />
          </div>
          <div className="flex-row items-center gap-1.5">
            <Label>Price</Label>
            <Input type="text" id="title" placeholder="Course Price" />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="text-md font-semibold">Contents</div>
          <Button variant={'secondary'}>
            <div className="flex gap-2">
              <PlusIcon /> Add Section
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewCoursePage
