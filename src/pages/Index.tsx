import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateNote } from '../modules/Note'
import { Note } from '../modules/Note/ui/Note'
import { useNotes } from '../shared/hooks/useNotes'
import { Loader } from '../shared/ui/Loader'

export const IndexPage: React.FC = () => {
	const { t } = useTranslation()
	const { notes, isLoading, setIsLoading, getNotes } = useNotes()

	useEffect(() => {
		const fetchNotes = async () => {
			setIsLoading(true)
			await getNotes()
			setIsLoading(false)
		}
		fetchNotes()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<section className='w-full flex flex-col gap-5'>
			<div className='mx-auto w-full md:w-1/2'>
				<CreateNote />
			</div>

			<div className='w-full flex flex-col gap-5'>
				{isLoading ? (
					<Loader className='mx-auto size-14' />
				) : notes.length ? (
					<>
						{notes.some(note => note.isPinned) ? (
							<>
								<h2 className='mt-12 text-2xl text-center'>
									{t('page.pinned')}
								</h2>
								<AnimatePresence mode='wait'>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 justify-items-center 2xl:grid-cols-7'
									>
										{notes
											.filter(note => note.isPinned)
											.map(note => (
												<motion.div
													key={note.id}
													initial={{ y: -10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													exit={{ y: -10, opacity: 0 }}
													transition={{ duration: 0.3 }}
												>
													<Note note={note} />
												</motion.div>
											))}
									</motion.div>
								</AnimatePresence>
							</>
						) : (
							<p className='text-center mt-8 text-xl'>
								{t('page.noPinnedNotes')}
							</p>
						)}

						{notes.some(note => !note.isPinned) ? (
							<>
								<h2 className='mt-12 text-2xl text-center'>
									{t('page.others')}
								</h2>
								<AnimatePresence mode='wait'>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 justify-items-center 2xl:grid-cols-7'
									>
										{notes
											.filter(note => !note.isPinned)
											.map(note => (
												<motion.div
													key={note.id}
													initial={{ y: -10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													exit={{ y: -10, opacity: 0 }}
													transition={{ duration: 0.3 }}
												>
													<Note note={note} />
												</motion.div>
											))}
									</motion.div>
								</AnimatePresence>
							</>
						) : (
							<p className='text-center mt-8 text-xl'>
								{t('page.noOtherNotes')}
							</p>
						)}
					</>
				) : (
					<p className='text-center mt-8 text-xl'>{t('page.noNotes')}</p>
				)}
			</div>
		</section>
	)
}
