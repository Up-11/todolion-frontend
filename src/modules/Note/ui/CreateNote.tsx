import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckSquare2,
	CheckSquare2Icon,
	ChevronRight,
	Pen,
	Pin,
	Tag,
	Text
} from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '../../../shared/components/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem
} from '../../../shared/components/form'
import { Input } from '../../../shared/components/input'
import { Textarea } from '../../../shared/components/textarea'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useGlobalLoading } from '../../../shared/hooks/useGlobalLoading'
import { useNotes } from '../../../shared/hooks/useNotes'
import { cn } from '../../../shared/lib/css'
import { AppTooltip } from '../../../shared/ui/AppTooltip'
import { INote } from '../../../types/common'
import { useNote } from '../model/useNote'

import { ContentListItem } from './ContentListItem'

export const CreateNote: React.FC = () => {
	const { t } = useTranslation()
	const { user } = useAuth()
	const db = getFirestore()
	const { setGlobalLoading } = useGlobalLoading()
	const { getNotes } = useNotes()

	const [state, setState] = useState({
		isCreating: false,
		isLoading: false,
		isPinned: false
	})

	const {
		isContent,
		isContentListExpanded,
		setIsContentListExpanded,
		form,
		deleteContentListItem,
		switchContent,
		contentList,
		addContentListItem,
		setIsContent
	} = useNote()

	const onClickOutside = async () => {
		if (state.isLoading) return
		if (!user?.uid) return

		const title = form.getValues().title
		const content = form.getValues().content
		const contentList = form.getValues().contentList

		if (!title) {
			if (contentList!.length > 0 || content === '') {
				setState({ ...state, isLoading: false, isCreating: false })
				setGlobalLoading(false)
			} else {
				toast.error(t('note.title.required'))
				setState({ ...state, isLoading: false })
				setGlobalLoading(false)
			}
			return
		}

		try {
			setState({ ...state, isLoading: true })
			setGlobalLoading(true)

			const payload: INote = {
				title,
				content,
				contentList,
				isPinned: state.isPinned,
				id: uuidv4(),
				updatedAt: new Date().toLocaleTimeString()
			}

			await setDoc(doc(db, `users/${user.uid}/notes/${payload.id}`), payload)
			toast.success(t('note.created'))
			form.reset()
			setState({ ...state, isCreating: false, isLoading: false })
			setGlobalLoading(false)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.message)
			setState({ ...state, isLoading: false })
			setGlobalLoading(false)
		} finally {
			getNotes()
		}
	}
	const startWithList = () => {
		setIsContent('list')
		setState({ ...state, isCreating: true })
	}
	return (
		<div>
			{state.isCreating && (
				<div className='fixed inset-0 z-10 ' onClick={onClickOutside} />
			)}

			<AnimatePresence mode='popLayout'>
				{!state.isCreating ? (
					<motion.div
						key='create-note-short'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='w-full z-20  bg-root flex  items-center gap-2 py-1 rounded-3xl px-4 '
						onClick={() => setState({ ...state, isCreating: true })}
					>
						<Pen size={20} />
						<Input
							className='h-10 !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0  '
							placeholder={t('note.creating')}
						/>
						<AppTooltip text={t('note.createList')}>
							<CheckSquare2
								onClick={startWithList}
								className='cursor-pointer'
							/>
						</AppTooltip>
					</motion.div>
				) : (
					<motion.div
						key='create-note-full'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='bg-root relative rounded-3xl p-4 z-20'
					>
						<Form {...form}>
							<form className='space-y-4'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													autoFocus
													className='w-full !text-2xl !bg-transparent !border-none'
													placeholder={t('note.title')}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
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
														rows={8}
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
																			onDelete={() =>
																				deleteContentListItem(index)
																			}
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
														onClick={() =>
															setIsContentListExpanded(prev => !prev)
														}
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
																										i === index
																											? updatedItem
																											: el
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
							</form>
						</Form>
						<Pin
							onClick={() => setState({ ...state, isPinned: !state.isPinned })}
							size={20}
							className={cn(
								'hover:text-cyan-500/80  transition-colors cursor-pointer absolute top-3 right-3',
								state.isPinned && 'text-cyan-500'
							)}
						/>

						<div className='flex mt-8 justify-between'>
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
								<Button
									onClick={() => setState({ ...state, isCreating: false })}
								>
									{t('note.cancel')}
								</Button>
								<Button onClick={addContentListItem}>
									{t('note.createListItem')}
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
