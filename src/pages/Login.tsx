import { zodResolver } from '@hookform/resolvers/zod'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { ROUTES } from '../config/routes'
import { ILoginSchema, LoginSchema } from '../modules/Auth/schema/login.schema'
import { Button } from '../shared/components/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../shared/components/form'
import { Input } from '../shared/components/input'
import { useAuth } from '../shared/hooks/useAuth'
import { Logo } from '../shared/ui/Logo'

export const LoginPage: React.FC = () => {
	const { t } = useTranslation()
	const auth = getAuth()
	const { setUser } = useAuth()
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<ILoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	function onSubmit(values: ILoginSchema) {
		setIsLoading(true)
		signInWithEmailAndPassword(auth, values.email, values.password)
			.then(userCredential => {
				setUser(userCredential.user)
				toast.success(t('auth.login.success'))
				navigate(ROUTES.INDEX)
				console.log(userCredential)
			})
			.catch(error => {
				const errorMessage = error.message
				toast.error(errorMessage)
			})
			.finally(() => setIsLoading(false))
	}
	return (
		<section className='w-full h-screen mt-auto flex items-center justify-center'>
			<div className='bg-[var(--root)]  p-10 rounded-2xl flex flex-col gap-4 w-[400px] max-w-[90%]'>
				<Logo />
				<h2 className='text-2xl font-bold text-center'>
					{t('auth.login.title')}
				</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('auth.email.label')}</FormLabel>
									<FormControl>
										<Input
											className='w-full'
											placeholder='Ivan.Andreevich@yandex.ru'
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('auth.email.desc')}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('auth.password.label')}</FormLabel>
									<FormControl>
										<Input
											className='w-full'
											placeholder='**********'
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('auth.password.desc')}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							loading={isLoading}
							variant={'default'}
							className='w-full'
						>
							{t('auth.login.btn')}
						</Button>
					</form>
				</Form>
				<div>
					<span> {t('auth.login.q')} </span>
					<NavLink
						to={ROUTES.AUTH.REGISTER}
						className='text-cyan-500 hover:underline'
					>
						{t('auth.login.link')}
					</NavLink>
				</div>
			</div>
		</section>
	)
}
