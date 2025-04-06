import { z } from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.email('Введите корректный адрес электронной почты')
		.nonempty('Поле электронной почты обязательно для заполнения'),

	password: z
		.string()
		.min(8, 'Пароль должен содержать как минимум 8 символов')
		.nonempty('Поле пароля обязательно для заполнения')
		.refine(
			value =>
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					value
				),
			'Пароль должен содержать: как минимум 1 заглавную букву, 1 строчную букву, 1 цифру и 1 специальный символ'
		)
})
export type ILoginSchema = z.infer<typeof LoginSchema>
