import { zodResolver } from '@hookform/resolvers/zod'
import {
	getAuth,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword
} from 'firebase/auth'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Button } from '../../../shared/components/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../../shared/components/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../../shared/components/form'
import { Input } from '../../../shared/components/input'
import { useAuth } from '../../../shared/hooks/useAuth'
import {
	EditProfileSchema,
	IEditProfileSchema
} from '../schemas/EditProfile.schema'

export function EditProfileDialog({ children }: PropsWithChildren) {
	const { user, credentials } = useAuth()
	const auth = getAuth()
	const { t } = useTranslation()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<IEditProfileSchema>({
		resolver: zodResolver(EditProfileSchema),
		defaultValues: {
			email: user?.email || '',
			password: '',
			confirmPassword: '',
			currentPassword: ''
		}
	})

	const editEmail = async (newEmail: string): Promise<void> => {
		reauthenticateWithCredential(auth.currentUser!, credentials!)
			.then(() =>
				updateEmail(auth.currentUser!, newEmail).catch(error => {
					const errorMessage = error.message
					toast.error(errorMessage, {})
				})
			)
			.catch(err => {
				const errorMessage = err.message
				toast.error(errorMessage, {})
			})
	}

	const editPassword = async (newPassword: string): Promise<void> => {
		reauthenticateWithCredential(auth.currentUser!, credentials!)
			.then(() =>
				updatePassword(auth.currentUser!, newPassword).catch(error => {
					const errorMessage = error.message
					toast.error(errorMessage, {})
				})
			)
			.catch(err => {
				const errorMessage = err.message
				toast.error(errorMessage, {})
			})
	}
	async function onSubmit(values: IEditProfileSchema) {
		setIsLoading(true)

		try {
			const hasEmailChange = values.email !== user?.email
			const hasPasswordChange = values.password !== ''

			const promises: Promise<void>[] = []

			if (hasEmailChange) {
				promises.push(editEmail(values.email!))
			}

			if (hasPasswordChange) {
				promises.push(editPassword(values.password!))
			}

			await Promise.all(promises)
			toast.success(t('editProfile.success'), {})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const errorMessage = error.message as string
			toast.error(errorMessage, {})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{t('editProfile.title')}</DialogTitle>
					<DialogDescription>{t('editProfile.desc')}</DialogDescription>
				</DialogHeader>

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
							name='currentPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('auth.currentPassword.label')}</FormLabel>
									<FormControl>
										<Input
											type='password'
											className='w-full'
											placeholder='**********'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t('auth.currentPassword.desc')}
									</FormDescription>
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
											type='password'
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

						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('auth.confirmPassword.label')}</FormLabel>
									<FormControl>
										<Input
											type='password'
											className='w-full'
											placeholder='**********'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t('auth.confirmPassword.desc')}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							loading={isLoading}
							type='submit'
							variant={'default'}
							className='w-full'
						>
							{t('editProfile.btn')}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
