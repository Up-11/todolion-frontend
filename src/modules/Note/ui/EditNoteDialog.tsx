import { zodResolver } from '@hookform/resolvers/zod'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { t } from 'i18next'
import {
	CheckSquare2Icon,
	ChevronRight,
	MoreVertical,
	Pin,
	Tag,
	Text
} from 'lucide-react'
import React, { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../../../shared/components/popover'
import { Textarea } from '../../../shared/components/textarea'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useGlobalLoading } from '../../../shared/hooks/useGlobalLoading'
import { useNotes } from '../../../shared/hooks/useNotes'
import { cn } from '../../../shared/lib/css'
import { AppTooltip } from '../../../shared/ui/AppTooltip'
import {
	mutateFromContentToList,
	mutateFromListToContent
} from '../../../shared/utils/notes'
import { INote } from '../../../types/common'
import { INoteSchema, NoteSchema } from '../schemas/Note.schema'

import { ContentListItem } from './ContentListItem'

export const EditNoteDialog: React.FC<
	PropsWithChildren & {
		isOpen: boolean
		setIsOpen: (newState: boolean) => void
	} & { note: INote }
> = ({ children, isOpen, setIsOpen, note }) => {
	console.log(note)

	const { user } = useAuth()
	const db = getFirestore()
	const { setGlobalLoading } = useGlobalLoading()
	const { deleteNote, getNotes } = useNotes()

	const onDelete = () => {
		deleteNote(note.id)
		getNotes()
		setIsOpen(false)
	}

	const [state, setState] = useState({
		isLoading: false,
		isPinned: false
	})

	const [isContent, setIsContent] = useState<'content' | 'list'>(
		note.content ? 'content' : 'list'
	)
	const [isContentListExpanded, setIsContentListExpanded] = useState(true)

	const switchContent = () => {
		if (isContent === 'content') {
			const newContent = mutateFromContentToList(content!)
			form.setValue('content', '')
			form.setValue('contentList', newContent)
			setIsContent('list')
		} else {
			const newContent = mutateFromListToContent(contentList!)
			form.setValue('content', newContent)
			form.setValue('contentList', [{ title: '', isDone: false }])
			setIsContent('content')
		}
	}
	const form = useForm<INoteSchema>({
		resolver: zodResolver(NoteSchema),
		defaultValues: {
			title: note.title,
			content: note.content || '',
			contentList: note.contentList || [{ title: '', isDone: false }]
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
			onClickOutside()
		}
		setIsOpen(newState)
	}

	const onClickOutside = async () => {
		if (state.isLoading) return
		if (!user?.uid) return
		if (contentList! === note.contentList || content === note.content) return

		try {
			setState({ ...state, isLoading: true })
			setGlobalLoading(true)

			const title = form.getValues().title
			const content = form.getValues().content
			const contentList = form.getValues().contentList

			if (!title) {
				if (contentList!.length > 0 || content === '') {
					setState({ ...state, isLoading: false })
					setGlobalLoading(false)
				} else {
					toast.error(t('note.title.required'))
					setState({ ...state, isLoading: false })
					setGlobalLoading(false)
				}
				return
			}

			const payload: INote = {
				title,
				content,
				contentList,
				isPinned: state.isPinned,
				id: note.id,
				updatedAt: new Date().toLocaleDateString()
			}

			await updateDoc(doc(db, `users/${user.uid}/notes/${payload.id}`), payload)
			toast.success(t('note.created'))
			form.reset()
			setState({ ...state, isLoading: false })
			setGlobalLoading(false)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.message)
			setState({ ...state, isLoading: false })
			setGlobalLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className=''>
				<Form {...form}>
					<form className='space-y-4'>
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
							{t('note.updatedAt')} {note.updatedAt}
						</p>
					</form>
				</Form>
				<div className='flex justify-between'>
					<div className='flex gap-2'>
						{isContent === 'content' ? (
							<AppTooltip text={t('note.createList')}>
								<CheckSquare2Icon
									onClick={() => switchContent()}
									size={20}
									className='hover:text-cyan-500  transition-colors cursor-pointer'
								/>
							</AppTooltip>
						) : (
							<AppTooltip text={t('note.createText')}>
								<Text
									onClick={() => switchContent()}
									size={20}
									className='hover:text-cyan-500  transition-colors cursor-pointer'
								/>
							</AppTooltip>
						)}
						<div className='flex items-center gap-1'>
							<AppTooltip text={t('note.addTag')}>
								<Tag
									size={20}
									className='hover:text-cyan-500 transition-colors cursor-pointer'
								/>
							</AppTooltip>
							<Pin
								onClick={() =>
									setState({ ...state, isPinned: !state.isPinned })
								}
								size={20}
								className={cn(
									'hover:text-cyan-500/80  transition-colors cursor-pointer ',
									state.isPinned && 'text-cyan-500'
								)}
							/>
							<Popover>
								<PopoverTrigger>
									<MoreVertical
										size={18}
										className='hover:text-cyan-500   transition-all cursor-pointer '
									/>
								</PopoverTrigger>
								<PopoverContent
									className='max-w-45 flex flex-col gap-2'
									align='start'
								>
									<Button
										onClick={onDelete}
										className='w-full'
										variant={'outline'}
									>
										{t('note.delete')}
									</Button>
									<Button className='w-full' variant={'outline'}>
										{t('tag.add')}
									</Button>
									<Button className='w-full' variant={'outline'}>
										{t('note.copy')}
									</Button>
									<Button className='w-full' variant={'outline'}>
										{t('note.archive')}
									</Button>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div className='flex gap-1 items-center'>
						<Button>{t('note.back')}</Button>
						<Button onClick={() => addContentListItem()}>
							{t('note.addListItem')}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
