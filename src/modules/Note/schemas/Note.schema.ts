import { z } from 'zod'

export const NoteSchema = z.object({
	title: z.string(),
	content: z.string(),
	contentList: z.array(
		z.object({
			title: z.string(),
			isDone: z.boolean()
		})
	)
})
export type INoteSchema = z.infer<typeof NoteSchema>
