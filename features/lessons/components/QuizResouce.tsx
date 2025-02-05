import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrashIcon } from 'lucide-react'

type ResourceType = 'video' | 'quiz' | null
interface Resource {
  id: string
  type: ResourceType
  title: string
  url?: string | null
  courseId?: string | null
  lessonId?: string | null
  quizId?: string | null
  createdAt?: Date
  updatedAt?: Date
}
interface QuizResourceProps {
  resource: Resource
  onEditChange: (id: string, field: string, value: string | string[]) => void
  onDelete: (id: string) => void
}

const QuizResource = ({
  resource,
  onEditChange,
  onDelete,
}: QuizResourceProps) => {
  return (
    <div className="space-y-4 p-4 flex flex-col gap-1">
      {/* Title Field */}
      <div>
        <Label>Title</Label>
        <Input
          value={resource.title}
          onChange={(e) => onEditChange(resource.id, 'title', e.target.value)}
        />
      </div>

      {/* Quiz Question */}
      {/* <Label>Quiz Question</Label> */}
      {/* <Input */}
      {/*   value={resource.quizQuestion || ''} */}
      {/*   onChange={(e) => */}
      {/*     onEditChange(resource.id, 'quizQuestion', e.target.value) */}
      {/*   } */}
      {/* /> */}

      {/* Quiz Options */}
      {/* <Label>Options (comma separated)</Label> */}
      {/* <Input */}
      {/*   value={resource.quizOptions?.join(', ') || ''} */}
      {/*   onChange={(e) => */}
      {/*     onEditChange( */}
      {/*       resource.id, */}
      {/*       'quizOptions', */}
      {/*       e.target.value.split(',').map((opt) => opt.trim()) */}
      {/*     ) */}
      {/*   } */}
      {/* /> */}

      {/* Correct Answer */}
      {/* <Label>Correct Answer</Label> */}
      {/* <Input */}
      {/*   value={resource.correctAnswer || ''} */}
      {/*   onChange={(e) => */}
      {/*     onEditChange(resource.id, 'correctAnswer', e.target.value) */}
      {/*   } */}
      {/* /> */}

      {/* Delete Button */}
      <Button
        variant="destructive"
        onClick={() => onDelete(resource.id)}
        className="mt-4"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default QuizResource
