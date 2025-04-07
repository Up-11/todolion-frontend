import { zodResolver } from '@hookform/resolvers/zod'
import { t } from 'i18next'
import { CheckSquare2Icon, ChevronRight, Tag, Text } from 'lucide-react'
import React, { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../shared/components/button'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '../../../shared/components/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem
} from '../../../shared/components/form'
import { Input } from '../../../shared/components/input'
import { Textarea } from '../../../shared/components/textarea'
import { cn } from '../../../shared/lib/css'
import { AppTooltip } from '../../../shared/ui/AppTooltip'
import {
	mutateFromContentToList,
	mutateFromListToContent
} from '../../../shared/utils/notes'
import { INote } from '../../../types/common'

import { ContentListItem } from './ContentListItem'

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

export const EditNoteDialog: React.FC<
	PropsWithChildren & {
		isOpen: boolean
		setIsOpen: (newState: boolean) => void
	} & { note: INote }
> = ({ children, isOpen, setIsOpen, note }) => {
	const [isContent, setIsContent] = useState<'content' | 'list'>(
		note.content ? 'content' : 'list'
	)
	const [isContentListExpanded, setIsContentListExpanded] = useState(false)

	const switchContent = () => {
		if (isContent === 'content') {
			const newContent = mutateFromContentToList(content!)
			form.setValue('content', undefined)
			form.setValue('contentList', newContent)
			setIsContent('list')
		} else {
			const newContent = mutateFromListToContent(contentList!)
			form.setValue('content', newContent)
			form.setValue('contentList', undefined)
			setIsContent('content')
		}
	}
	const form = useForm<INoteSchema>({
		resolver: zodResolver(NoteSchema),
		defaultValues: {
			title: note.title,
			content: note.content,
			contentList: note.contentList
		}
	})

	const contentList = form.watch('contentList')
	const content = form.watch('content')

	const addContentListItem = () => {
		form.setValue('contentList', [
			...contentList!,
			{ title: '', isDone: false }
		])
	}

	const deleteContentListItem = (index: number) => {
		form.setValue(
			'contentList',
			contentList?.filter((_, i) => i !== index)
		)
	}

	const onOpenChange = (newState: boolean) => {
		if (newState === false) {
			form.handleSubmit(onSubmit)()
		}
		setIsOpen(newState)
	}

	function onSubmit(values: INoteSchema) {
		console.log(values)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className=''>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<DialogTitle>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='w-full !text-2xl !bg-transparent !border-none'
												placeholder={t('note.title')}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</DialogTitle>
						{isContent === 'content' && (
							<FormField
								control={form.control}
								name='content'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												className='w-full resize-none !bg-transparent !border-none !text-lg'
												placeholder={t('note.desc')}
												rows={14}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						)}
						{isContent === 'list' && (
							<div>
								<FormField
									control={form.control}
									name='contentList'
									render={({ field }) => (
										<div>
											{field.value!.map(
												(item, index) =>
													item.isDone !== true && (
														<FormItem key={index}>
															<FormControl>
																<ContentListItem
																	item={item}
																	onDelete={() => deleteContentListItem(index)}
																	onUpdate={updatedItem => {
																		field.onChange(
																			field.value!.map((el, i) =>
																				i === index ? updatedItem : el
																			)
																		)
																	}}
																/>
															</FormControl>
														</FormItem>
													)
											)}
										</div>
									)}
								/>
								{isContent === 'list' &&
									contentList!.filter(item => item.isDone).length > 0 && (
										<div className='mt-4'>
											<div
												className='flex items-center justify-start gap-1 cursor-pointer p-1'
												onClick={() => setIsContentListExpanded(prev => !prev)}
											>
												<ChevronRight
													className={cn(
														isContentListExpanded && 'rotate-90',
														'transition-transform'
													)}
												/>
												<p className='text-lg select-none'>
													{t('note.completed')}:{' '}
													{contentList!.filter(curr => curr.isDone).length}
												</p>
											</div>
											{isContentListExpanded && (
												<FormField
													control={form.control}
													name='contentList'
													render={({ field }) => (
														<div>
															{field.value!.map(
																(item, index) =>
																	item.isDone && (
																		<FormItem key={index}>
																			<FormControl>
																				<ContentListItem
																					onDelete={() =>
																						deleteContentListItem(index)
																					}
																					item={item}
																					onUpdate={updatedItem => {
																						field.onChange(
																							field.value!.map((el, i) =>
																								i === index ? updatedItem : el
																							)
																						)
																					}}
																				/>
																			</FormControl>
																		</FormItem>
																	)
															)}
														</div>
													)}
												/>
											)}
										</div>
									)}
							</div>
						)}
						<p className='text-end'>
							{t('note.updatedAt')} {note.updatedAt.toLocaleTimeString()}
						</p>

						<div className='flex justify-between'>
							<div className='flex gap-2'>
								{isContent === 'content' ? (
									<AppTooltip text={t('note.createList')}>
										<CheckSquare2Icon
											onClick={switchContent}
											size={20}
											className='hover:text-cyan-500  transition-colors cursor-pointer'
										/>
									</AppTooltip>
								) : (
									<AppTooltip text={t('note.createText')}>
										<Text
											onClick={switchContent}
											size={20}
											className='hover:text-cyan-500  transition-colors cursor-pointer'
										/>
									</AppTooltip>
								)}{' '}
								<AppTooltip text={t('note.addTag')}>
									<Tag
										size={20}
										className='hover:text-cyan-500 transition-colors cursor-pointer'
									/>
								</AppTooltip>
							</div>
							<div className='flex gap-1 items-center'>
								<Button>{t('note.back')}</Button>
								<Button onClick={() => addContentListItem()}>
									{t('note.addListItem')}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
