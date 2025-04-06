import { z } from 'zod'

export const EditProfileSchema = z
	.object({
		email: z
			.string()
			.email('Введите корректный адрес электронной почты')
			.optional(),
		password: z.string().optional(),
		confirmPassword: z.string().optional(),
		currentPassword: z.string().nonempty('Введите текущий пароль')
	})
	.refine(
		data => {
			if (data.password && !data.confirmPassword) {
				return false
			}
			return data.password === data.confirmPassword
		},
		{
			message: 'Пароли не совпадают',
			path: ['confirmPassword']
		}
	)

export type IEditProfileSchema = z.infer<typeof EditProfileSchema>
