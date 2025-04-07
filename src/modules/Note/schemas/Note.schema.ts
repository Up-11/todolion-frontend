import { z } from 'zod'

export const NoteSchema = z.object({
	title: z.string(),
	content: z.string().optional(),
	contentList: z
		.array(
			z.object({
				title: z.string(),
				isDone: z.boolean()
			})
		)
		.optional()
})
export type INoteSchema = z.infer<typeof NoteSchema>
