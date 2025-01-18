import { getLessonFromId } from '@/server/db/lessons'
import { notFound } from 'next/navigation'

type SearchParams = { [key: string]: string | undefined }

export default async function LessonEditPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const search_params = await searchParams
  const lesson_id = search_params.lid
  if (!lesson_id) {
    return notFound()
  }

  const lesson = await getLessonFromId({ lessonId: lesson_id })
  return <h1>{lesson_id}</h1>
}
// interface EditSheetProps {
//   lesson: Lesson
// }
// const EditSheet = ({ lesson }: EditSheetProps) => {
//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button variant={'ghost'} className="flex gap-1 px-1" asChild>
//           <div className="flex gap-1">
//             <EditIcon />
//             Edit
//           </div>
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Lesson</DialogTitle>
//           <DialogDescription>
//             Update the lesson details below. Changes will only be saved when you
//             click "Save Changes."
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex flex-col gap-6 mt-4">
//           {/* Lesson Tier */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium">Tier:</span>
//             <Badge className="w-fit">{lesson.tier}</Badge>
//           </div>
//
//           {/* Lesson Form */}
//           {/* <LessonForm lesson={lesson} /> */}
//         </div>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant={'secondary'}>Close</Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// interface LessonFormProps {
//   lesson: Lesson
// }

// const LessonForm = ({ lesson }: LessonFormProps) => {
//   if (lesson.id === undefined) {
//     return <div>Opps! Lesson not found!</div>
//   }
//
//   return (
//     <>
//       <LessonTitle title={lesson.title} id={lesson.id} />
//     </>
//   )
// }

// const lessonTitleFormSchema = z.object({
//   title: z
//     .string()
//     .min(10, {
//       message: 'Title must be at least 10 characters.',
//     })
//     .max(255, {
//       message: 'Title must not exceed 255 characters.',
//     }),
// })

// interface LessonTitleProps {
//   title: string
//   id: string
// }

// const LessonTitle = ({ title, id }: LessonTitleProps) => {
//   // const [toggle, setToggle] = useState(true)
//   // const [lessonTitle, setLessonTitle] = useState(lesson.title)
//
//   const form = useForm<z.infer<typeof lessonTitleFormSchema>>({
//     resolver: zodResolver(lessonTitleFormSchema),
//     defaultValues: {
//       title: title,
//     },
//   })
//
//   function onSubmit(values: z.infer<typeof lessonTitleFormSchema>) {
//     console.log(values)
//   }
//
//   return (
//     <>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     rows={2}
//                     placeholder="Enter a title..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   This is the title of your lesson.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Save Changes</Button>
//         </form>
//       </Form>
//     </>
//   )
// }

// interface LessonVideoUrlProps {
//   videoUrl: string
//   id: string
// }
//
// const LessonVideo = ({ videoUrl, id }: LessonVideoUrlProps) => {
//   return (
//     <>
//       <div>{id}</div>
//     </>
//   )
// }
